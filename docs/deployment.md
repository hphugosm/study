# Doména a nasazení

Veřejná adresa aplikace je **https://studilo.xyz/**. Zdrojový repozitář je
[hphugosm/study](https://github.com/hphugosm/study). Změny na `main` automaticky
spustí `.github/workflows/pages.yml`: kontrolu JavaScriptu, jednotkové testy,
sestavení a nasazení do GitHub Pages. Stejný postup lze ručně spustit v Actions.

## Nastavení GitHub Pages

- Settings → Pages → Source: **GitHub Actions**.
- Custom domain: **studilo.xyz**.
- Po vystavení certifikátu zapnout **Enforce HTTPS**.

Doména patří do nastavení Pages. Pro nasazení vlastním Actions workflow se
soubor `CNAME` nepoužívá; nastavení domény není součástí výstupu `dist/`.
Neměnit DNS ani doménu při běžné aktualizaci aplikace.

## DNS u Gen.xyz

Nameservery zůstávají `ns-canada.topdns.com`, `ns-uk.topdns.com` a
`ns-usa.topdns.com`. V DNS zóně `studilo.xyz` jsou tyto záznamy:

| Hostitel | Typ | Hodnota |
| --- | --- | --- |
| prázdný (kořen domény) | A | 185.199.108.153 |
| prázdný (kořen domény) | A | 185.199.109.153 |
| prázdný (kořen domény) | A | 185.199.110.153 |
| prázdný (kořen domény) | A | 185.199.111.153 |
| www | CNAME | hphugosm.github.io |

Do CNAME nepatří `https://` ani `/study/`. Pro hlavní adresu se nepoužívá
přesměrovací služba registrátora. GitHub obslouží web i přesměrování `www`
na hlavní adresu. Původní URL `https://hphugosm.github.io/study/` rovněž
přesměruje na vlastní doménu.

Po změně DNS mohou jednotlivé sítě ještě používat staré záznamy nebo
dříve uloženou odpověď, že doména neexistuje. GitHub vystaví HTTPS certifikát
až po ověření DNS. Dokud není certifikát platný, neobcházet bezpečnostní
varování prohlížeče. Kontrola po změně:

```sh
dig studilo.xyz A
dig www.studilo.xyz CNAME
gh api repos/hphugosm/study/pages
curl -I https://studilo.xyz/
curl -I https://www.studilo.xyz/
STUDY_TEST_URL=https://studilo.xyz/ npm run test:e2e
```

macOS má také vlastní resolverovou cache, kterou `dig` nepoužívá. Pokud
`dig` už vrací správné adresy, ale aplikace stále hlásí neznámý server,
může pomoci cílené opětovné ověření záznamu v systémové DNS službě:

```sh
dns-sd -t 10 -C studilo.xyz A IN
curl -I https://studilo.xyz/
```

Příkaz po deseti sekundách skončí. Ověřuje pouze daný DNS záznam; nastavení
domény zůstává v GitHub Pages a u registrátora. Tento postup byl při
připojení 5. listopadu ověřen: systém nejprve vrátil starou zápornou
odpověď a poté si načetl všechny čtyři správné adresy.

Nezávislé ověření na čistém počítači GitHubu: Actions → **Verify live Studilo**
→ **Run workflow**, nebo `gh workflow run verify-live.yml --repo hphugosm/study`.
Ručně spouštěná kontrola používá běžné DNS, Chromium a Safari WebKit proti
`https://studilo.xyz/`; HTML report a diagnostiku uchovává 14 dnů. Nic
nenasazuje a nemění společný obsah. Neúspěšný test znamená neúspěšný běh.

Oficiální podrobnosti: [vlastní doména GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Samostatná aplikace a uložený postup

Cesty obrázků, PDF, modulů, manifestu a service workeru jsou relativní.
Stejný sestavený web funguje na kořeni `studilo.xyz/` i v podadresáři `/study/`.
Na nové doméně se offline balíček stáhne znovu; stav je v Nastavení.

Prohlížeč odděluje postup i instalované aplikace podle domény. Původní data
na `hphugosm.github.io` se připojením domény nemažou, ale nová adresa je nemůže
automaticky načíst. Pro přenos použít **Nastavení → Záloha postupu** v ještě
otevřené původní aplikaci a následně import na `studilo.xyz`. Webová aplikace
na ploše iPhonu má být znovu přidaná z `https://studilo.xyz/`. Počkat na stav
**Připraveno offline** přímo v nově otevřené aplikaci.
