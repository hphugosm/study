# Instalace a offline režim

Studilo má manifest se samostatným zobrazením, vlastní ikony 192/512 px a Apple touch ikonu 180 px. `start_url`, `id` i `scope` jsou relativní, takže funguje i nasazení pod `/study/` na GitHub Pages. Na iPhonu je instalace dostupná přes systémovou nabídku Safari: Sdílet → Přidat na plochu; pokud systém nabízí „Otevřít jako webovou aplikaci“, ponechat zapnuté. Web sám nemůže tuto systémovou akci provést. Návod je schovaný v nastavení, bez vyskakovacího instalačního banneru.

Prohlížeče, které poskytují `beforeinstallprompt`, mohou zobrazit skutečný instalační dialog z tlačítka v nastavení. Safari dostává postup přes svoji systémovou nabídku. Samostatný režim se rozpoznává pomocí `display-mode: standalone` a `navigator.standalone`.

## Úplný offline balíček

`npm run build` sestaví `dist/` a vygeneruje `offline-manifest.json`. Ten obsahuje všechny skutečně nasazované soubory, velikosti a SHA-256. Jeho verze je odvozená z obsahu celého webu i zdroje service workeru. Balíček zahrnuje společné rozhraní, styly a fonty, všechny moduly Biologie, Law a Matematiky, jejich obrázky, PDF a původní prezentace. Aktuálně jde o 235 souborů, přibližně 28 MiB. Předem nemusíš otevírat jednotlivé předměty.

První otevření s připojením spustí přípravu automaticky. Nastavení hlásí připravenost až poté, co se všechny soubory stáhnou, ověří kontrolním součtem a uloží. Samotná přítomnost service workeru nestačí. `GET_STATUS` zkontroluje i přítomnost všech očekávaných URL v cache. Po úspěšné přípravě lze bez sítě znovu otevřít kalendář, obě studijní části, jejich obrázky i PDF. LocalStorage s výsledky je na cache nezávislá a zůstává funkční offline.

Pro lokální kontrolu plného offline režimu:

```sh
npm run build
node scripts/serve.mjs --dist
```

Zdrojový vývojový server bez sestavení nemá vygenerovaný balíček. Běžné stránky fungují, ale offline příprava se tam nehlásí jako dokončená.

## Aktualizace bez přerušení testu

Otevřená aplikace kontroluje aktualizace při návratu do popředí a přibližně jednou za minutu, když je viditelná a připojená. Nová verze se nejdřív připraví jako úplný ověřený snapshot. Na hlavní stránce se potom sama načte. Nenápadná hláška přímo nad kalendářem ukáže stahování, případné čekání na jiný panel a dokončení aktualizace.

Každý otevřený panel musí před přepnutím potvrdit svou aktuální stránku. Během otevřeného tématu, kvízu nebo jiné práce zůstává dosavadní verze. Po návratu všech panelů do kalendáře se přepnutí provede automaticky. Kontrola vychází z živé odpovědi stránky, protože `WindowClient.url` může po navigaci pomocí `pushState` obsahovat starší adresu. Krátké předání po dokončeném stažení dočasně zablokuje navigaci; při odložení se ovládání hned uvolní. Výsledky a nastavení v localStorage se zachovají.

JavaScriptové moduly a styly dostávají při sestavení URL s revizí obsahu. Revize pokrývá i všechny statické a dynamické importy. Safari tak nemůže při více otevřených panelech použít starý modul kalendáře z paměti pod adresou nové verze. Nejprve se vytvoří revize zdrojů, potom se počítá manifest z přesných výsledných bajtů; kontrolní součty tak zůstávají platné. Offline cache obsluhuje verzované požadavky ze stejného ověřeného snapshotu.

Shodné podklady se přebírají z předchozího snapshotu, pokud souhlasí jejich záznam v manifestu i nově ověřený SHA-256 obsahu. Ze sítě se stáhnou změněné, chybějící nebo poškozené soubory. Drobná změna kalendáře tak nestahuje znovu všechny obrázky a PDF. Selhání instalace ponechá fungující dosavadní verzi; další kontrola pokus zopakuje.

Ruční kontrola a tlačítko v Nastavení zůstávají jako doplňková možnost. U již otevřené starší verze, která automatický protokol ještě nezná, proběhne tento první přechod přes dosavadní tlačítko nebo po dokončeném stažení a zavření všech jejích oken. Další aktualizace už pravidelné klikání nepotřebují. Neodpovídající starší či uspaný panel se násilně nepřenačítá.

Service worker používá jen svůj prefix `study-offline:<scope>:`. Při aktivaci odstraňuje výhradně předchozí verze stejného rozsahu; nemaže jiné aplikace ani studijní localStorage. Dokumenty se zkouší načíst ze sítě, ale HTML jiné verze se nespojí se starými skripty: v takovém případě se použije úplná dosavadní offline verze a nabídne aktualizace. Známé assety jsou obslouženy z ověřeného snapshotu. PDF podporují i dílčí `Range` požadavky.

## Omezení

První příprava potřebuje připojení a volné místo. iOS/prohlížeč může při nedostatku místa nebo po vymazání dat webu offline cache odstranit; stav v nastavení pak není „připraveno“ a tlačítko umožní obsah znovu stáhnout. Při změně verze je nejprve nutné dokončit aktualizaci. Instalovaná aplikace a Safari mohou mít podle verze iOS samostatné úložiště; po instalaci je vhodné otevřít Studilo jednou s připojením a ověřit přípravu přímo v této aplikaci. Offline podklady neznamenají automatickou synchronizaci postupu mezi zařízeními.

Ověřeno podle primárních podkladů: [Apple — webová aplikace na ploše iPhonu](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios), [MDN — životní cyklus a cache service workerů](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).

## Dřívější kontrola ručního životního cyklu

Vedle browser sady byl proveden izolovaný rollout test v dočasné kopii sestaveného webu. Po první přípravě se změnil soubor CSS, přepočítaly hashe a manifest a vystavila skutečná nová verze workeru. Nový worker dokončil stahování a zůstal ve stavu `waiting`; právě zodpovězená Law otázka i její vysvětlení zůstaly zachované. Při druhém otevřeném panelu bylo explicitní přepnutí odmítnuté s vysvětlením. Po jeho zavření požadovaná aktualizace proběhla a nová verze přežila obnovení stránky bez sítě. Nesouvisející kontrolní cache zůstala zachovaná.

Samostatný první-instalační smoke test otevřel původně nenavštívené Law flashcards a biologické obrázkové karty bez sítě, načetl skutečný biologický obrázek a ověřil offline PDF `Range` odpověď `206` s platnou hlavičkou `%PDF-`. Obnovení celé stránky bez sítě nevyvolalo chyby stránky. Testy používaly oddělené browserové kontexty; nejde o tvrzení o fyzicky nainstalovaném iPhonu.

Byla simulována i chyba `503` u jednoho souboru při úplně první instalaci. Prohlížeč po selhání odstranil registraci workeru; tlačítko opakování ji nyní bezpečně vytvoří znovu a neopírá se o neplatný původní objekt. Opakovaná příprava dokončila celý balíček bez obnovení stránky, po čemž fungovalo offline otevření dosud nenavštívené Law jednotky i úplný reload. Stejná ochrana je použitá při kontrole aktualizací.
