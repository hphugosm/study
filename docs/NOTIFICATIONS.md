# Novinky a zpětná vazba

## Co funguje samostatně na GitHub Pages

Zvoneček otevře `#/notifications`. Uživatel si zvolí předměty a druhy změn. Volby, přečtené položky a malá fronta upozornění zůstávají v daném prohlížeči. Zapnutí vytvoří výchozí přehled bez upozornění na starší obsah. Další kontroly probíhají při otevření, návratu do aplikace a nejvýše jednou za tři minuty ve viditelné stránce. Při výpadku sítě zůstane poslední přehled zachovaný.

Sestavení vytváří deterministický `notifications.json` pouze ze schválených veřejných podkladů, ověřených řešení a skutečných termínů. Stejný obsah má stejnou verzi; pouhý čas sestavení nic nemění. Změna termínu nahradí staré upozornění. Datum bez potvrzené hodiny se nepoužívá k přesné připomínce. Sloučený Law test zůstává jedinou událostí. Soubor se načítá ze sítě i při starší offline verzi aplikace.

## Volitelné připojené služby

`src/community-config.js` obsahuje pouze veřejnou adresu služby a veřejný Turnstile sitekey. Prázdné hodnoty záměrně vypnou odesílání formuláře a zapínání systémových oznámení. Web to uživateli výslovně sdělí. Žádný tajný klíč nepatří do tohoto repozitáře.

Samostatná soukromá služba používá Cloudflare Worker/D1 na bezplatném plánu. Zpětnou vazbu posílá do soukromých GitHub Issues, kam návštěvník nepotřebuje účet. Formulář nepožaduje jméno, e-mail ani přílohu; neposílá adresu navštívené stránky, cookies ani historii. Posílá nejvýše známé veřejné téma, kategorii a samotnou zprávu. Poskytovatelé sítě a ověření mohou vidět IP adresu a text sám může autora identifikovat. Anonymita tedy neznamená nezjistitelnost. Nezadávejte hesla, známky ani soukromé školní údaje.

Systémová oznámení vyžadují samostatné výslovné zapnutí. Odběr a jeho náhodný správcovský klíč jsou oddělené od zpětné vazby a nepatří do veřejných souborů ani do zálohy studijního postupu. Po změně výběru uživatel potvrdí jeho použití pro systémový odběr. Prázdný potvrzený výběr nebo tlačítko Vypnout odstraní odběr. Na iPhonu/iPadu je potřeba podporovaný systém a aplikace přidaná na plochu. Doručení ani přesnou hodinu nelze zaručit.

Privátní odesílač má připravenou kontrolu jednou za tři hodiny; plán zůstává vypnutý do nastavení služby a ověření bezplatného čerpání Actions. Nepoužívá AI API. Limity služby zastaví odesílání, nezapnou vyšší placený tarif. Samotný příznak v konfiguraci nenahrazuje kontrolu skutečného tarifu a billingu účtu.

## Ověření

`npm run check`, `npm test`, `npm run build`. Testy kontrolují skutečný generovaný přehled, prvotní výchozí stav, opakování, změny termínů, chyby sítě/úložiště, bezpečné odkazy, izolaci záloh, ověření formuláře a odhlašování vlastního odběru. Sestavení zařazuje přehled do ověřeného offline manifestu, velké přílohy dál nestahuje automaticky.
