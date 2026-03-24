(function () {
  const locales = [
    { code: "en", label: "English" },
    { code: "ro", label: "Română" },
    { code: "it", label: "Italiano" },
    { code: "es", label: "Español" },
    { code: "el", label: "Ελληνικά" },
    { code: "hr", label: "Hrvatski" },
  ];

  const ui = {
    en: {
      cardsEyebrow: "Real-world learning",
      cardsTitle: "Learn from case studies",
      cardsCopy:
        "Explore a standalone library of sustainability case studies with shared language controls. The selected language stays available in the card view and in each case study page.",
      filtersTitle: "Filter the library",
      filtersCopy: "Choose a topic and open any study in the same language you selected here.",
      openFirstStudy: "Open the first study",
      languageLabel: "Language",
      noResults: "No case studies match this category yet.",
      readCaseStudy: "Read case study",
      backToCards: "Back to all cards",
      availableLanguages: "Available languages",
      completionTitle: "Reading progress",
      completionCopy:
        "This standalone version stores completion locally in the browser, so the study can still be marked as done without a backend.",
      completionReady: "Mark as completed",
      completionLocked: "Read to unlock",
      completionDone: "Completed",
      completionHintLocked: "Scroll through at least 80% of the article to unlock the completion button.",
      completionHintDone: "This study is already marked as completed on this device.",
      nextStudy: "Go to next case study",
      moreStudiesTitle: "More case studies",
      metaReadTime: "min read",
      metaPoints: "pts",
      metaCategory: "Category",
      categories: {
        all: "All",
        "water-management": "Water management",
        "circular-economy": "Circular economy",
        "education-innovation": "Education innovation",
        "digital-learning": "Digital learning",
      },
      countries: {
        ethiopia: "Ethiopia",
        italy: "Italy",
        spain: "Spain",
      },
    },
    ro: {
      cardsEyebrow: "Învățare din lumea reală",
      cardsTitle: "Învață din studii de caz",
      cardsCopy:
        "Explorează o bibliotecă standalone de studii de caz despre sustenabilitate, cu control comun pentru limbă. Limba aleasă rămâne disponibilă atât în pagina cu carduri, cât și în pagina fiecărui studiu de caz.",
      filtersTitle: "Filtrează biblioteca",
      filtersCopy: "Alege o temă și deschide orice studiu în aceeași limbă selectată aici.",
      openFirstStudy: "Deschide primul studiu",
      languageLabel: "Limbă",
      noResults: "Nu există încă studii de caz pentru această categorie.",
      readCaseStudy: "Citește studiul de caz",
      backToCards: "Înapoi la toate cardurile",
      availableLanguages: "Limbi disponibile",
      completionTitle: "Progres la citire",
      completionCopy:
        "Această versiune standalone salvează progresul local în browser, astfel încât studiul poate fi marcat ca finalizat și fără backend.",
      completionReady: "Marchează ca finalizat",
      completionLocked: "Citește pentru a debloca",
      completionDone: "Finalizat",
      completionHintLocked: "Parcurge cel puțin 80% din articol pentru a debloca butonul de finalizare.",
      completionHintDone: "Acest studiu este deja marcat ca finalizat pe acest dispozitiv.",
      nextStudy: "Mergi la următorul studiu de caz",
      moreStudiesTitle: "Mai multe studii de caz",
      metaReadTime: "min citire",
      metaPoints: "pct",
      metaCategory: "Categorie",
      categories: {
        all: "Toate",
        "water-management": "Managementul apei",
        "circular-economy": "Economie circulară",
        "education-innovation": "Inovație în educație",
        "digital-learning": "Învățare digitală",
      },
      countries: {
        ethiopia: "Etiopia",
        italy: "Italia",
        spain: "Spania",
      },
    },
    it: {
      cardsEyebrow: "Apprendimento dal mondo reale",
      cardsTitle: "Impara dai case study",
      cardsCopy:
        "Esplora una libreria standalone di case study sulla sostenibilità con controllo lingua condiviso. La lingua scelta resta disponibile nella pagina delle card e in ogni pagina di dettaglio.",
      filtersTitle: "Filtra la libreria",
      filtersCopy: "Scegli un tema e apri qualsiasi case study nella stessa lingua selezionata qui.",
      openFirstStudy: "Apri il primo case study",
      languageLabel: "Lingua",
      noResults: "Nessun case study corrisponde ancora a questa categoria.",
      readCaseStudy: "Leggi il case study",
      backToCards: "Torna a tutte le card",
      availableLanguages: "Lingue disponibili",
      completionTitle: "Progresso di lettura",
      completionCopy:
        "Questa versione standalone salva il completamento nel browser, quindi il case study può essere segnato come concluso anche senza backend.",
      completionReady: "Segna come completato",
      completionLocked: "Leggi per sbloccare",
      completionDone: "Completato",
      completionHintLocked: "Scorri almeno l'80% dell'articolo per sbloccare il pulsante di completamento.",
      completionHintDone: "Questo case study è già segnato come completato su questo dispositivo.",
      nextStudy: "Vai al case study successivo",
      moreStudiesTitle: "Altri case study",
      metaReadTime: "min di lettura",
      metaPoints: "pt",
      metaCategory: "Categoria",
      categories: {
        all: "Tutti",
        "water-management": "Gestione dell'acqua",
        "circular-economy": "Economia circolare",
        "education-innovation": "Innovazione educativa",
        "digital-learning": "Apprendimento digitale",
      },
      countries: {
        ethiopia: "Etiopia",
        italy: "Italia",
        spain: "Spagna",
      },
    },
    es: {
      cardsEyebrow: "Aprendizaje del mundo real",
      cardsTitle: "Aprende con estudios de caso",
      cardsCopy:
        "Explora una biblioteca standalone de estudios de caso sobre sostenibilidad con un control de idioma compartido. El idioma elegido se mantiene tanto en la página de tarjetas como en cada estudio.",
      filtersTitle: "Filtra la biblioteca",
      filtersCopy: "Elige un tema y abre cualquier estudio en el mismo idioma que seleccionaste aquí.",
      openFirstStudy: "Abrir el primer estudio",
      languageLabel: "Idioma",
      noResults: "Todavía no hay estudios de caso para esta categoría.",
      readCaseStudy: "Leer estudio de caso",
      backToCards: "Volver a todas las tarjetas",
      availableLanguages: "Idiomas disponibles",
      completionTitle: "Progreso de lectura",
      completionCopy:
        "Esta versión standalone guarda el progreso localmente en el navegador, así que el estudio puede marcarse como completado incluso sin backend.",
      completionReady: "Marcar como completado",
      completionLocked: "Leer para desbloquear",
      completionDone: "Completado",
      completionHintLocked: "Desplázate por al menos el 80% del artículo para desbloquear el botón de finalización.",
      completionHintDone: "Este estudio ya está marcado como completado en este dispositivo.",
      nextStudy: "Ir al siguiente estudio de caso",
      moreStudiesTitle: "Más estudios de caso",
      metaReadTime: "min de lectura",
      metaPoints: "pts",
      metaCategory: "Categoría",
      categories: {
        all: "Todos",
        "water-management": "Gestión del agua",
        "circular-economy": "Economía circular",
        "education-innovation": "Innovación educativa",
        "digital-learning": "Aprendizaje digital",
      },
      countries: {
        ethiopia: "Etiopía",
        italy: "Italia",
        spain: "España",
      },
    },
    el: {
      cardsEyebrow: "Μάθηση από πραγματικές περιπτώσεις",
      cardsTitle: "Μάθε μέσα από case studies",
      cardsCopy:
        "Εξερεύνησε μια αυτόνομη βιβλιοθήκη case studies βιωσιμότητας με κοινό έλεγχο γλώσσας. Η γλώσσα που επιλέγεις παραμένει διαθέσιμη τόσο στη σελίδα με τις κάρτες όσο και στη σελίδα κάθε μελέτης.",
      filtersTitle: "Φίλτραρε τη βιβλιοθήκη",
      filtersCopy: "Διάλεξε θέμα και άνοιξε οποιαδήποτε μελέτη στην ίδια γλώσσα που επέλεξες εδώ.",
      openFirstStudy: "Άνοιξε την πρώτη μελέτη",
      languageLabel: "Γλώσσα",
      noResults: "Δεν υπάρχουν ακόμη case studies για αυτή την κατηγορία.",
      readCaseStudy: "Διάβασε τη μελέτη",
      backToCards: "Επιστροφή σε όλες τις κάρτες",
      availableLanguages: "Διαθέσιμες γλώσσες",
      completionTitle: "Πρόοδος ανάγνωσης",
      completionCopy:
        "Αυτή η αυτόνομη έκδοση αποθηκεύει την ολοκλήρωση τοπικά στον browser, ώστε η μελέτη να μπορεί να σημειωθεί ως ολοκληρωμένη χωρίς backend.",
      completionReady: "Σήμανση ως ολοκληρωμένη",
      completionLocked: "Διάβασε για ξεκλείδωμα",
      completionDone: "Ολοκληρώθηκε",
      completionHintLocked: "Κάνε κύλιση τουλάχιστον στο 80% του άρθρου για να ξεκλειδώσεις το κουμπί ολοκλήρωσης.",
      completionHintDone: "Αυτή η μελέτη έχει ήδη σημειωθεί ως ολοκληρωμένη σε αυτή τη συσκευή.",
      nextStudy: "Πήγαινε στην επόμενη μελέτη περίπτωσης",
      moreStudiesTitle: "Περισσότερα case studies",
      metaReadTime: "λεπτά ανάγνωσης",
      metaPoints: "βαθμοί",
      metaCategory: "Κατηγορία",
      categories: {
        all: "Όλα",
        "water-management": "Διαχείριση νερού",
        "circular-economy": "Κυκλική οικονομία",
        "education-innovation": "Καινοτομία στην εκπαίδευση",
        "digital-learning": "Ψηφιακή μάθηση",
      },
      countries: {
        ethiopia: "Αιθιοπία",
        italy: "Ιταλία",
        spain: "Ισπανία",
      },
    },
    hr: {
      cardsEyebrow: "Učenje iz stvarnog svijeta",
      cardsTitle: "Uči kroz studije slučaja",
      cardsCopy:
        "Istraži standalone biblioteku studija slučaja o održivosti sa zajedničkom kontrolom jezika. Odabrani jezik ostaje dostupan i na stranici kartica i na stranici pojedine studije.",
      filtersTitle: "Filtriraj biblioteku",
      filtersCopy: "Odaberi temu i otvori bilo koju studiju na istom jeziku koji si ovdje izabrao.",
      openFirstStudy: "Otvori prvu studiju",
      languageLabel: "Jezik",
      noResults: "Još nema studija slučaja za ovu kategoriju.",
      readCaseStudy: "Otvori studiju slučaja",
      backToCards: "Natrag na sve kartice",
      availableLanguages: "Dostupni jezici",
      completionTitle: "Napredak čitanja",
      completionCopy:
        "Ova standalone verzija sprema završetak lokalno u pregledniku, pa se studija može označiti kao završena i bez backenda.",
      completionReady: "Označi kao završeno",
      completionLocked: "Čitaj za otključavanje",
      completionDone: "Završeno",
      completionHintLocked: "Pomakni se kroz najmanje 80% članka kako bi otključao gumb za završetak.",
      completionHintDone: "Ova studija je već označena kao završena na ovom uređaju.",
      nextStudy: "Idi na sljedeću studiju slučaja",
      moreStudiesTitle: "Više studija slučaja",
      metaReadTime: "min čitanja",
      metaPoints: "bodova",
      metaCategory: "Kategorija",
      categories: {
        all: "Sve",
        "water-management": "Upravljanje vodom",
        "circular-economy": "Kružno gospodarstvo",
        "education-innovation": "Obrazovna inovacija",
        "digital-learning": "Digitalno učenje",
      },
      countries: {
        ethiopia: "Etiopija",
        italy: "Italija",
        spain: "Španjolska",
      },
    },
  };

  const studies = [
    {
      id: "warka-tower",
      country: "ethiopia",
      category: "water-management",
      icon: "drop",
      readTime: 10,
      points: 30,
      gradient: ["#0f9283", "#173260"],
      translations: {
        en: {
          title: "Warka Tower: Harvesting Water from Air",
          description:
            "A passive structure that captures fog, dew, and humidity to create a local water source in water-scarce communities.",
          sections: [
            { type: "heading", text: "Description" },
            { type: "paragraph", text: "Warka Tower shows how low-energy design can turn atmospheric moisture into a practical source of drinking water." },
            { type: "paragraph", text: "The structure uses natural materials, modular assembly, and a condensation mesh that can be maintained locally." },
            { type: "heading", text: "Context" },
            { type: "paragraph", text: "The model is relevant in rural communities facing water scarcity, weak infrastructure, and long travel times to reach safe water sources." },
            { type: "heading", text: "Key elements" },
            {
              type: "bullets",
              items: [
                "It combines modern design with biomimicry and traditional water-collection logic.",
                "Its modular build and local materials make replication easier in different environments.",
                "The project strengthens participation by involving communities, especially women, in construction and maintenance."
              ]
            },
            { type: "heading", text: "Results" },
            { type: "paragraph", text: "Warka Tower has been presented as an effective and sustainable response to water scarcity, with reported benefits for hygiene, community wellbeing, and local resilience." }
          ]
        },
        ro: {
          title: "Turnul Warka de arhitectul Arturo Vittori",
          description:
            "Turnul Warka este conceput pentru a colecta apa din atmosferă, oferind o sursă alternativă de apă pentru populațiile rurale care se confruntă cu dificultăți în accesarea apei potabile.",
          sections: [
            { type: "heading", text: "Descriere" },
            { type: "paragraph", text: "„Turnul Warka este conceput pentru a colecta apa din atmosferă (ploaie, ceață, rouă), oferind o sursă alternativă de apă pentru populațiile rurale care se confruntă cu dificultăți în accesarea apei potabile.”" },
            { type: "paragraph", text: "Proiectat de arhitectul italian Arturo Vittori, Turnul Warka reprezintă o soluție inovatoare pentru colectarea apei potabile în zonele rurale cu resurse limitate de apă. Inspirat de tehnicile tradiționale de colectare a apei și de principiile biomimetismului, turnul valorifică materialele naturale și locale, cum ar fi bambusul și fibrele vegetale, pentru a extrage apa din atmosferă." },
            { type: "heading", text: "Context" },
            { type: "paragraph", text: "Turnul Warka a fost construit în mai multe comunități rurale din țări precum Etiopia, Togo și Haiti, caracterizate de condiții climatice aride, infrastructură de apă inadecvată și dificultăți socio-economice." },
            { type: "heading", text: "Aspecte cheie" },
            {
              type: "bullets",
              items: [
                "Are un impact pozitiv asupra sănătății și bunăstării comunităților prin furnizarea de apă curată și prin reducerea timpului petrecut cu colectarea apei.",
                "Combină designul modern și biomimetica cu tehnicile tradiționale, iar structura sa modulară și materialele locale îl fac ușor de adaptat și reprodus.",
                "Construcția și administrarea turnului implică activ comunitatea locală, iar femeile joacă un rol cheie în proiect și în gestionarea colectării apei."
              ]
            },
            { type: "heading", text: "Rezultate" },
            { type: "paragraph", text: "Turnul Warka s-a dovedit a fi o soluție eficientă și sustenabilă pentru colectarea apei în comunitățile rurale cu deficit de apă și a contribuit la îmbunătățirea sănătății, igienei și condițiilor de viață." }
          ]
        },
        it: {
          title: "Torre Warka dell'architetto Arturo Vittori",
          description:
            "La Warka Tower è progettata per raccogliere l'acqua dall'atmosfera, offrendo una fonte d'acqua alternativa alle popolazioni rurali che hanno difficoltà ad accedere all'acqua potabile.",
          sections: [
            { type: "heading", text: "Descrizione" },
            { type: "paragraph", text: "\"La Warka Tower è progettata per raccogliere l'acqua dall'atmosfera (pioggia, nebbia, rugiada), offrendo una fonte d'acqua alternativa alle popolazioni rurali che hanno difficoltà ad accedere all'acqua potabile.\"" },
            { type: "paragraph", text: "Progettata dall'architetto italiano Arturo Vittori, la Torre Warka rappresenta una soluzione innovativa per la raccolta di acqua potabile nelle aree rurali con scarse risorse idriche. Ispirata alle tecniche tradizionali di raccolta dell'acqua e ai principi della biomimetica, sfrutta materiali naturali e locali per estrarre acqua dall'atmosfera." },
            { type: "heading", text: "Contesto" },
            { type: "paragraph", text: "La Torre Warka è stata costruita in diverse comunità rurali in paesi come Etiopia, Togo e Haiti, caratterizzati da condizioni climatiche aride, infrastrutture idriche inadeguate e difficoltà socio-economiche." },
            { type: "heading", text: "Aspetti chiave" },
            {
              type: "bullets",
              items: [
                "Ha un impatto positivo su salute e benessere fornendo acqua pulita, riducendo il tempo necessario per raccoglierla e migliorando l'igiene.",
                "Combina design moderno, biomimetica e tecniche tradizionali; la struttura modulare e i materiali locali la rendono adattabile e replicabile.",
                "Coinvolge attivamente la comunità locale nella costruzione e nella gestione, promuovendo collaborazione, appartenenza ed empowerment femminile."
              ]
            },
            { type: "heading", text: "Risultati" },
            { type: "paragraph", text: "La Torre Warka si è dimostrata una soluzione efficace e sostenibile per la raccolta dell'acqua nelle comunità rurali con scarsità d'acqua, con benefici per salute, igiene e condizioni di vita." }
          ]
        },
        es: {
          title: "Warka Tower por Arturo Vittori",
          description:
            "La Torre Warka está diseñada para recolectar agua de la atmósfera, proporcionando una fuente de agua alternativa para las poblaciones rurales que enfrentan dificultades para acceder al agua potable.",
          sections: [
            { type: "heading", text: "Descripción" },
            { type: "paragraph", text: "\"La Torre Warka está diseñada para recolectar agua de la atmósfera (lluvia, niebla, rocío) proporcionando una fuente de agua alternativa para las poblaciones rurales que enfrentan desafíos para acceder al agua potable\"." },
            { type: "paragraph", text: "Diseñada por el arquitecto italiano Arturo Vittori, la Torre Warka representa una solución innovadora para la recolección de agua potable en áreas rurales con escasos recursos hídricos. Aprovecha materiales naturales y locales, como el bambú y las fibras vegetales, para extraer agua de la atmósfera." },
            { type: "heading", text: "Contexto" },
            { type: "paragraph", text: "La Torre Warka se ha construido en varias comunidades rurales de países como Etiopía, Togo y Haití, caracterizadas por condiciones climáticas áridas, infraestructura hídrica inadecuada y dificultades socioeconómicas." },
            { type: "heading", text: "Aspectos clave" },
            {
              type: "bullets",
              items: [
                "Tiene un impacto positivo en la salud y el bienestar al proporcionar agua limpia, reducir el tiempo dedicado a recolectarla y mejorar la higiene.",
                "Combina diseño moderno, biomímesis y técnicas tradicionales; su estructura modular y el uso de materiales locales facilitan la replicabilidad.",
                "La construcción y gestión involucran activamente a la comunidad local, con un papel especialmente importante de las mujeres."
              ]
            },
            { type: "heading", text: "Resultados" },
            { type: "paragraph", text: "Warka Tower ha demostrado ser una solución eficaz y sostenible para la recolección de agua en comunidades rurales con escasez de agua y ha contribuido a mejorar la salud, la higiene y las condiciones de vida." }
          ]
        },
        el: {
          title: "Warka Tower από τον αρχιτέκτονα Arturo Vittori",
          description:
            "Ο Πύργος Warka έχει σχεδιαστεί για να συλλέγει νερό από την ατμόσφαιρα, παρέχοντας μια εναλλακτική πηγή νερού για τους αγροτικούς πληθυσμούς που αντιμετωπίζουν δυσκολίες στην πρόσβαση σε πόσιμο νερό.",
          sections: [
            { type: "heading", text: "Περιγραφή" },
            { type: "paragraph", text: "«Ο Πύργος Warka έχει σχεδιαστεί για να συλλέγει νερό από την ατμόσφαιρα (βροχή, ομίχλη, δροσιά), παρέχοντας μια εναλλακτική πηγή νερού για τους αγροτικούς πληθυσμούς που αντιμετωπίζουν δυσκολίες στην πρόσβαση σε πόσιμο νερό.»" },
            { type: "paragraph", text: "Σχεδιασμένος από τον Ιταλό αρχιτέκτονα Arturo Vittori, ο Πύργος Warka αντιπροσωπεύει μια καινοτόμο λύση για τη συλλογή πόσιμου νερού σε αγροτικές περιοχές με περιορισμένους υδάτινους πόρους. Εμπνέεται από τις παραδοσιακές τεχνικές συλλογής νερού και τις αρχές της βιομίμησης." },
            { type: "heading", text: "Συμφραζόμενα" },
            { type: "paragraph", text: "Ο Πύργος Warka έχει κατασκευαστεί σε διάφορες αγροτικές κοινότητες σε χώρες όπως η Αιθιοπία, το Τόγκο και η Αϊτή, όπου υπάρχουν ξηρές κλιματικές συνθήκες, ανεπαρκείς υποδομές ύδρευσης και κοινωνικοοικονομικές δυσκολίες." },
            { type: "heading", text: "Βασικά σημεία" },
            {
              type: "bullets",
              items: [
                "Έχει θετικό αντίκτυπο στην υγεία και την ευημερία των κοινοτήτων παρέχοντας καθαρό νερό και βελτιώνοντας την υγιεινή.",
                "Συνδυάζει μοντέρνο σχεδιασμό, βιομίμηση και παραδοσιακές τεχνικές, ενώ η αρθρωτή δομή του και η χρήση τοπικών υλικών τον καθιστούν εύκολα αναπαραγώγιμο.",
                "Η κατασκευή και η διαχείρισή του εμπλέκουν ενεργά την τοπική κοινότητα και προωθούν τη συνεργασία και την ενδυνάμωση των γυναικών."
              ]
            },
            { type: "heading", text: "Αποτελέσματα" },
            { type: "paragraph", text: "Ο Πύργος Warka έχει αποδειχθεί μια αποτελεσματική και βιώσιμη λύση για τη συλλογή νερού σε αγροτικές κοινότητες με λειψυδρία και έχει οδηγήσει σε βελτιώσεις στην υγεία, την υγιεινή και τις συνθήκες διαβίωσης." }
          ]
        },
        hr: {
          title: "Warka toranj arhitekta Artura Vittorija",
          description:
            "Warka Tower je dizajniran za prikupljanje vode iz atmosfere, pružajući alternativni izvor vode za ruralno stanovništvo koje se suočava s poteškoćama u pristupu pitkoj vodi.",
          sections: [
            { type: "heading", text: "Opis" },
            { type: "paragraph", text: "„Warka Tower je dizajniran za prikupljanje vode iz atmosfere (kiše, magle, rose) pružajući alternativni izvor vode za ruralno stanovništvo koje se suočava s poteškoćama u pristupu pitkoj vodi.“" },
            { type: "paragraph", text: "Toranj Warka, koji je dizajnirao talijanski arhitekt Arturo Vittori, predstavlja inovativno rješenje za prikupljanje pitke vode u ruralnim područjima s oskudnim vodnim resursima. Inspiriran je tradicionalnim tehnikama prikupljanja vode i principima biomimikrije." },
            { type: "heading", text: "Kontekst" },
            { type: "paragraph", text: "Toranj Warka izgrađen je u nekoliko ruralnih zajednica u zemljama poput Etiopije, Toga i Haitija, koje karakteriziraju sušni klimatski uvjeti, neadekvatna vodna infrastruktura i socioekonomske poteškoće." },
            { type: "heading", text: "Ključne točke" },
            {
              type: "bullets",
              items: [
                "Pozitivno utječe na zdravlje i dobrobit zajednica osiguravajući čistu vodu, skraćujući vrijeme prikupljanja vode i poboljšavajući higijenu.",
                "Kombinira moderni dizajn, biomimikriju i tradicionalne tehnike, a modularna struktura i lokalni materijali olakšavaju prilagodbu i repliciranje.",
                "Izgradnja i upravljanje aktivno uključuju lokalnu zajednicu te posebno osnažuju žene u prikupljanju i upravljanju vodom."
              ]
            },
            { type: "heading", text: "Rezultati" },
            { type: "paragraph", text: "Warka Tower pokazao se učinkovitim i održivim rješenjem za prikupljanje vode u ruralnim zajednicama s nestašicom vode te je pridonio poboljšanju zdravlja, higijene i životnih uvjeta." }
          ]
        }
      }
    },
    {
      id: "rifo-circular-fashion",
      country: "italy",
      category: "circular-economy",
      icon: "loop",
      readTime: 9,
      points: 25,
      gradient: ["#16834d", "#0f9283"],
      translations: {
        en: {
          title: "Rifò: Circular Fashion Revolution",
          description:
            "An Italian example of how repair, recycled fibers, and transparent storytelling can reshape value in the fashion industry.",
          sections: [
            { type: "heading", text: "Description" },
            { type: "paragraph", text: "Rifò is presented as an Italian company that reduces textile waste by transforming discarded garments into new, high-quality products." },
            { type: "paragraph", text: "Its model combines circular economy principles, local production in Prato, and a strong emphasis on transparency and social responsibility." },
            { type: "heading", text: "Context" },
            { type: "paragraph", text: "The practice is rooted in the textile district of Prato and targets consumers who care about sustainability, ethical production, and design quality." },
            { type: "heading", text: "Key elements" },
            {
              type: "bullets",
              items: [
                "It relies on recycled and regenerated materials, including post-consumer garments.",
                "It promotes a circular fashion system designed for reuse, repair, and recycling.",
                "It engages consumers, schools, and universities in sustainability and circular-fashion education."
              ]
            },
            { type: "heading", text: "Results" },
            { type: "paragraph", text: "The case study reports significant results in reducing textile waste, recycling large quantities of fabric, and increasing public awareness around sustainability in fashion." }
          ]
        },
        ro: {
          title: "Rifò",
          description:
            "Rifò este o companie italiană cu o misiune clară: să revoluționeze industria modei prin producția de îmbrăcăminte și accesorii sustenabile.",
          sections: [
            { type: "heading", text: "Descriere" },
            { type: "paragraph", text: "Rifò este o inflexiune toscană a verbului „rifare”, un nume care preia tradiția reciclării textilelor din Prato și care a fost transmisă din generație în generație de peste un secol." },
            { type: "paragraph", text: "Rifò este o companie italiană fondată pe filosofia economiei circulare și se angajează să reducă impactul asupra mediului al sectorului textil prin transformarea deșeurilor și a articolelor de îmbrăcăminte uzate în produse noi, de înaltă calitate." },
            { type: "heading", text: "Context" },
            { type: "paragraph", text: "Rifò operează în principal în Italia, în districtul textil Prato, unde colaborează cu entități locale pentru colectarea și reciclarea textilelor și promovează o schimbare culturală în sectorul modei." },
            { type: "heading", text: "Aspecte cheie" },
            {
              type: "bullets",
              items: [
                "Folosește materiale reciclate și regenerate, atât pre-consum, cât și post-consum, pentru a limita deșeurile și nevoia de materii prime noi.",
                "Construiește un model de modă circulară, în care produsele sunt gândite pentru reutilizare și reciclare la sfârșitul ciclului de viață.",
                "Promovează producția locală și artizanală, transparența, responsabilitatea și proiecte sociale precum „Nei Nostri Panni”."
              ]
            },
            { type: "heading", text: "Rezultate" },
            { type: "paragraph", text: "Rifò a obținut rezultate semnificative în reducerea deșeurilor textile și promovarea modei circulare, colectând și reciclând tone de textile și crescând gradul de conștientizare în rândul consumatorilor." }
          ]
        },
        it: {
          title: "Rifò",
          description:
            "Rifò è un'azienda italiana con una missione chiara: rivoluzionare il settore della moda attraverso la produzione di abbigliamento e accessori sostenibili.",
          sections: [
            { type: "heading", text: "Descrizione" },
            { type: "paragraph", text: "Rifò è una declinazione toscana del verbo \"rifare\", un nome che riprende la tradizione del riciclo tessile nata a Prato e tramandata da oltre un secolo." },
            { type: "paragraph", text: "Fondata sulla filosofia dell'economia circolare, Rifò si impegna a ridurre l'impatto ambientale del settore tessile trasformando scarti e capi usati in nuovi prodotti di alta qualità." },
            { type: "heading", text: "Contesto" },
            { type: "paragraph", text: "Rifò opera principalmente nel distretto tessile di Prato e si rivolge a un pubblico ampio e diversificato, attento alla sostenibilità, alla produzione etica e alla qualità estetica." },
            { type: "heading", text: "Aspetti chiave" },
            {
              type: "bullets",
              items: [
                "Utilizza materiali riciclati e rigenerati, sia pre-consumo sia post-consumo, per limitare sprechi e uso di nuove materie prime.",
                "Costruisce un modello di moda circolare in cui i prodotti sono progettati per essere riutilizzati e riciclati a fine ciclo.",
                "Unisce produzione locale e artigianale, trasparenza, responsabilità sociale e progetti di integrazione come \"Nei Nostri Panni\"."
              ]
            },
            { type: "heading", text: "Risultati" },
            { type: "paragraph", text: "Rifò ha raggiunto risultati significativi nella riduzione degli sprechi tessili e nella promozione della moda circolare, raccogliendo e riciclando tonnellate di tessuti e sensibilizzando un numero crescente di consumatori." }
          ]
        },
        es: {
          title: "Rifò",
          description:
            "Rifò es una empresa italiana con una misión clara: revolucionar la industria de la moda a través de la producción de ropa y accesorios sostenibles.",
          sections: [
            { type: "heading", text: "Descripción" },
            { type: "paragraph", text: "Rifò es una inflexión toscana del verbo \"rifare\", un nombre que retoma la tradición del reciclaje textil nacida en Prato y transmitida durante más de un siglo." },
            { type: "paragraph", text: "Fundada en la filosofía de la economía circular, Rifò se compromete a reducir el impacto ambiental del sector textil transformando residuos y prendas usadas en productos nuevos y de alta calidad." },
            { type: "heading", text: "Contexto" },
            { type: "paragraph", text: "Rifò opera principalmente en Italia, dentro del distrito textil de Prato, donde colabora con entidades locales para la recogida y el reciclaje de textiles y promueve un cambio cultural en el sector de la moda." },
            { type: "heading", text: "Aspectos clave" },
            {
              type: "bullets",
              items: [
                "Utiliza materiales reciclados y regenerados, tanto preconsumo como posconsumo, para reducir residuos y limitar el uso de materias primas nuevas.",
                "Desarrolla un sistema de moda circular donde los productos están diseñados para reutilizarse y reciclarse al final de su ciclo de vida.",
                "Combina producción local y artesanal, transparencia, responsabilidad y proyectos sociales que promueven la integración y la educación sobre moda circular."
              ]
            },
            { type: "heading", text: "Resultados" },
            { type: "paragraph", text: "Rifò ha logrado resultados significativos en la reducción de residuos textiles y en la promoción de la moda circular, creando nuevos productos de alta calidad y aumentando la sensibilización de las personas consumidoras." }
          ]
        },
        el: {
          title: "Rifò",
          description:
            "Η Rifò είναι μια ιταλική εταιρεία με σαφή αποστολή: να φέρει επανάσταση στη βιομηχανία της μόδας μέσω της παραγωγής βιώσιμων ενδυμάτων και αξεσουάρ.",
          sections: [
            { type: "heading", text: "Περιγραφή" },
            { type: "paragraph", text: "Το Rifò είναι μια τοσκανική κλίση του ρήματος \"rifare\", ένα όνομα που αντλεί από την παράδοση της ανακύκλωσης υφασμάτων που γεννήθηκε στο Πράτο και μεταδίδεται εδώ και περισσότερο από έναν αιώνα." },
            { type: "paragraph", text: "Βασισμένη στη φιλοσοφία της κυκλικής οικονομίας, η Rifò δεσμεύεται να μειώσει τις περιβαλλοντικές επιπτώσεις του κλωστοϋφαντουργικού τομέα μετατρέποντας απόβλητα και μεταχειρισμένα ενδύματα σε νέα προϊόντα υψηλής ποιότητας." },
            { type: "heading", text: "Συμφραζόμενα" },
            { type: "paragraph", text: "Η Rifò δραστηριοποιείται κυρίως στην Ιταλία, στην κλωστοϋφαντουργική περιοχή του Πράτο, όπου συνεργάζεται με τοπικούς φορείς για τη συλλογή και ανακύκλωση υφασμάτων και προωθεί μια πιο κυκλική και περιβαλλοντικά σεβαστή προσέγγιση στη μόδα." },
            { type: "heading", text: "Βασικά σημεία" },
            {
              type: "bullets",
              items: [
                "Χρησιμοποιεί ανακυκλωμένα και αναγεννημένα υλικά, τόσο πριν όσο και μετά την κατανάλωση, ώστε να μειώνει τα απόβλητα και την ανάγκη για νέες πρώτες ύλες.",
                "Στοχεύει στη δημιουργία ενός κυκλικού συστήματος μόδας όπου τα προϊόντα σχεδιάζονται για επαναχρησιμοποίηση και ανακύκλωση.",
                "Συνδυάζει τοπική και χειροτεχνική παραγωγή, διαφάνεια, υπευθυνότητα και κοινωνικά έργα που στηρίζουν την ένταξη και την εκπαίδευση για τη βιωσιμότητα."
              ]
            },
            { type: "heading", text: "Αποτελέσματα" },
            { type: "paragraph", text: "Η Rifò έχει επιτύχει σημαντικά αποτελέσματα στη μείωση των υφασμάτινων αποβλήτων και στην προώθηση της κυκλικής μόδας, συλλέγοντας και ανακυκλώνοντας τόνους υφασμάτων και ευαισθητοποιώντας όλο και περισσότερους καταναλωτές." }
          ]
        },
        hr: {
          title: "Rifò",
          description:
            "Rifò je talijanska tvrtka s jasnom misijom: revolucionirati modnu industriju proizvodnjom održive odjeće i modnih dodataka.",
          sections: [
            { type: "heading", text: "Opis" },
            { type: "paragraph", text: "Rifò je toskanska infleksija glagola \"rifare\", naziv koji preuzima tradiciju recikliranja tekstila iz Prata i prenosi se već više od stoljeća." },
            { type: "paragraph", text: "Temeljen na filozofiji kružnog gospodarstva, Rifò smanjuje utjecaj tekstilnog sektora na okoliš pretvaranjem otpada i rabljene odjeće u nove, visokokvalitetne proizvode." },
            { type: "heading", text: "Kontekst" },
            { type: "paragraph", text: "Rifò posluje prvenstveno u Italiji, unutar tekstilne četvrti Prato, gdje surađuje s lokalnim subjektima na prikupljanju i recikliranju tekstila te promiče kulturni pomak prema kružnoj modi." },
            { type: "heading", text: "Ključne točke" },
            {
              type: "bullets",
              items: [
                "Koristi reciklirane i regenerirane materijale, prije i nakon potrošnje, kako bi smanjio otpad i potrebu za novim sirovinama.",
                "Razvija kružni modni sustav u kojem su proizvodi osmišljeni za ponovnu upotrebu i recikliranje na kraju životnog ciklusa.",
                "Spaja lokalnu i obrtničku proizvodnju, transparentnost, odgovornost i društvene projekte koji podupiru održivost i uključivanje."
              ]
            },
            { type: "heading", text: "Rezultati" },
            { type: "paragraph", text: "Rifò je ostvario značajne rezultate u smanjenju tekstilnog otpada i promicanju kružne mode, reciklirajući tone tekstila i podižući svijest sve većeg broja potrošača." }
          ]
        }
      }
    },
    {
      id: "flipped-learning-adult-education",
      country: "spain",
      category: "education-innovation",
      icon: "cap",
      readTime: 8,
      points: 20,
      gradient: ["#e0a56b", "#1172bd"],
      translations: {
        en: {
          title: "Flipped Learning in Adult Education",
          description:
            "A teaching approach that moves direct instruction outside the classroom and uses live sessions for practice, dialogue, and applied learning.",
          sections: [
            { type: "heading", text: "Description" },
            { type: "paragraph", text: "Flipped Learning reverses the traditional model by moving theoretical content before the session and using classroom time for practical work." },
            { type: "paragraph", text: "The approach is especially relevant in adult education because it supports active learning, autonomy, and personalization." },
            { type: "heading", text: "Context" },
            { type: "paragraph", text: "It can be applied in vocational courses, universities of the third age, and continuing-education programs where flexibility and autonomy matter." },
            { type: "heading", text: "Key elements" },
            {
              type: "bullets",
              items: [
                "Learners access theory through videos, readings, or podcasts before class.",
                "Synchronous time is used for discussion, problem solving, teamwork, and feedback.",
                "The model strengthens digital skills and shared responsibility for learning."
              ]
            },
            { type: "heading", text: "Results" },
            { type: "paragraph", text: "The documents report improved learner engagement, better understanding of content, stronger learning outcomes, and greater satisfaction with the educational experience." }
          ]
        },
        ro: {
          title: "Învățare inversată în educația adulților",
          description:
            "Flipped Learning este o abordare pedagogică ce inversează modelul tradițional de învățare și folosește timpul din clasă pentru activități interactive.",
          sections: [
            { type: "heading", text: "Descriere" },
            { type: "paragraph", text: "Flipped Learning este o abordare pedagogică ce inversează modelul tradițional de învățare. Elevii accesează conținut educațional, cum ar fi lecții video sau lecturi, acasă, înainte de lecția din clasă." },
            { type: "paragraph", text: "Acest lucru permite ca timpul din clasă să fie dedicat activităților interactive, cum ar fi discuții, rezolvarea problemelor și lucrul în grup, cu sprijinul profesorului, promovând o interacțiune mai strânsă între elevi și profesor." },
            { type: "heading", text: "Context" },
            { type: "paragraph", text: "Învățarea inversată poate fi aplicată în diverse contexte de educație pentru adulți, cum ar fi cursurile de formare profesională, universitățile pentru vârsta a treia și programele de educație continuă." },
            { type: "heading", text: "Aspecte cheie" },
            {
              type: "bullets",
              items: [
                "Mută studiul conținutului teoretic acasă și folosește timpul din clasă pentru activități practice și interactive.",
                "Este deosebit de potrivită pentru educația adulților deoarece promovează autonomia, personalizarea și flexibilitatea.",
                "Se bazează pe tehnologii precum platforme de e-learning, lecții video, podcasturi și instrumente de colaborare online."
              ]
            },
            { type: "heading", text: "Rezultate" },
            { type: "paragraph", text: "Studiile și cercetările au arătat că învățarea inversată poate duce la îmbunătățirea rezultatelor învățării, la o implicare sporită a elevilor și la o satisfacție mai mare față de experiența educațională." }
          ]
        },
        it: {
          title: "Apprendimento capovolto nell'educazione degli adulti",
          description:
            "Il Flipped Learning è un approccio pedagogico che inverte il modello di apprendimento tradizionale e usa il tempo in aula per attività pratiche e interattive.",
          sections: [
            { type: "heading", text: "Descrizione" },
            { type: "paragraph", text: "Il Flipped Learning è un approccio pedagogico che inverte il modello di apprendimento tradizionale. Gli studenti accedono a contenuti didattici, come videolezioni o letture, a casa prima della lezione in classe." },
            { type: "paragraph", text: "Questo consente di dedicare il tempo in classe ad attività interattive, come discussioni, problem-solving e lavori di gruppo, con il supporto dell'insegnante, favorendo una maggiore interazione tra studenti e docente." },
            { type: "heading", text: "Contesto" },
            { type: "paragraph", text: "Il Flipped Learning può essere applicato in diversi contesti di formazione per adulti, come corsi di formazione professionale, università della terza età e programmi di formazione continua." },
            { type: "heading", text: "Aspetti chiave" },
            {
              type: "bullets",
              items: [
                "Gli studenti studiano i contenuti teorici a casa e utilizzano il tempo in aula per attività pratiche e collaborative.",
                "È particolarmente adatto alla formazione degli adulti perché promuove autonomia, personalizzazione e flessibilità.",
                "Si basa su piattaforme di e-learning, videolezioni, podcast e strumenti di collaborazione online."
              ]
            },
            { type: "heading", text: "Risultati" },
            { type: "paragraph", text: "Studi e ricerche hanno dimostrato che il Flipped Learning può portare a risultati di apprendimento migliori, a un maggiore coinvolgimento degli studenti e a una maggiore soddisfazione per l'esperienza educativa." }
          ]
        },
        es: {
          title: "Aprendizaje invertido en la educación de adultos",
          description:
            "Flipped Learning es un enfoque pedagógico que invierte el modelo de aprendizaje tradicional y dedica el tiempo de aula a actividades interactivas y colaborativas.",
          sections: [
            { type: "heading", text: "Descripción" },
            { type: "paragraph", text: "Flipped Learning es un enfoque pedagógico que invierte el modelo de aprendizaje tradicional. Los estudiantes acceden a contenido educativo, como lecciones en video o lecturas, en casa antes de la lección en el aula." },
            { type: "paragraph", text: "Esto permite dedicar tiempo en el aula a actividades interactivas, como discusiones, resolución de problemas y trabajo en grupo, con el apoyo del profesor, fomentando una mayor interacción entre los estudiantes y el profesor." },
            { type: "heading", text: "Contexto" },
            { type: "paragraph", text: "El Flipped Learning se puede aplicar en diversos contextos de educación de adultos, como cursos de formación profesional, universidades de la tercera edad y programas de educación continua." },
            { type: "heading", text: "Aspectos clave" },
            {
              type: "bullets",
              items: [
                "Traslada el estudio del contenido teórico al hogar y reserva el tiempo presencial para actividades prácticas e interactivas.",
                "Es especialmente adecuado para la educación de adultos porque promueve la autonomía, la personalización y la flexibilidad.",
                "Se apoya en plataformas de aprendizaje electrónico, videolecciones, pódcast y herramientas de colaboración en línea."
              ]
            },
            { type: "heading", text: "Resultados" },
            { type: "paragraph", text: "Los estudios e investigaciones han demostrado que el Flipped Learning puede conducir a mejores resultados de aprendizaje, mayor participación del alumnado y una mayor satisfacción con la experiencia educativa." }
          ]
        },
        el: {
          title: "Αντίστροφη μάθηση στην εκπαίδευση ενηλίκων",
          description:
            "Η Αντεστραμμένη Μάθηση είναι μια παιδαγωγική προσέγγιση που αντιστρέφει το παραδοσιακό μοντέλο μάθησης και αξιοποιεί τον χρόνο στην τάξη για διαδραστικές δραστηριότητες.",
          sections: [
            { type: "heading", text: "Περιγραφή" },
            { type: "paragraph", text: "Η Αντεστραμμένη Μάθηση (Flipped Learning) είναι μια παιδαγωγική προσέγγιση που αντιστρέφει το παραδοσιακό μοντέλο μάθησης. Οι μαθητές έχουν πρόσβαση σε εκπαιδευτικό περιεχόμενο, όπως μαθήματα βίντεο ή αναγνώσεις, στο σπίτι πριν από το μάθημα στην τάξη." },
            { type: "paragraph", text: "Αυτό επιτρέπει στον χρόνο στην τάξη να αφιερώνεται σε διαδραστικές δραστηριότητες, όπως συζητήσεις, επίλυση προβλημάτων και ομαδική εργασία, με την υποστήριξη του εκπαιδευτικού." },
            { type: "heading", text: "Συμφραζόμενα" },
            { type: "paragraph", text: "Η Αντεστραμμένη Μάθηση μπορεί να εφαρμοστεί σε διάφορα πλαίσια εκπαίδευσης ενηλίκων, όπως μαθήματα επαγγελματικής κατάρτισης, πανεπιστήμια τρίτης ηλικίας και προγράμματα συνεχιζόμενης εκπαίδευσης." },
            { type: "heading", text: "Βασικά σημεία" },
            {
              type: "bullets",
              items: [
                "Οι μαθητές μελετούν το θεωρητικό περιεχόμενο στο σπίτι και χρησιμοποιούν τον χρόνο στην τάξη για πρακτικές και συνεργατικές δραστηριότητες.",
                "Η προσέγγιση είναι ιδιαίτερα κατάλληλη για την εκπαίδευση ενηλίκων επειδή ενισχύει την αυτονομία, την εξατομίκευση και την ευελιξία.",
                "Βασίζεται σε πλατφόρμες ηλεκτρονικής μάθησης, μαθήματα βίντεο, podcast και εργαλεία διαδικτυακής συνεργασίας."
              ]
            },
            { type: "heading", text: "Αποτελέσματα" },
            { type: "paragraph", text: "Μελέτες και έρευνες έχουν δείξει ότι η Αντεστραμμένη Μάθηση μπορεί να οδηγήσει σε βελτιωμένα μαθησιακά αποτελέσματα, αυξημένη εμπλοκή των μαθητών και μεγαλύτερη ικανοποίηση από την εκπαιδευτική εμπειρία." }
          ]
        },
        hr: {
          title: "Obrnuto učenje u obrazovanju odraslih",
          description:
            "Obrnuto učenje je pedagoški pristup koji preokreće tradicionalni model učenja i koristi vrijeme u učionici za praktične i interaktivne aktivnosti.",
          sections: [
            { type: "heading", text: "Opis" },
            { type: "paragraph", text: "Obrnuto učenje je pedagoški pristup koji preokreće tradicionalni model učenja. Učenici pristupaju obrazovnom sadržaju, poput video lekcija ili čitanja, kod kuće prije nastave u učionici." },
            { type: "paragraph", text: "To omogućuje da se vrijeme u učionici posveti interaktivnim aktivnostima, poput rasprava, rješavanja problema i grupnog rada, uz podršku učitelja, potičući veću interakciju između učenika i učitelja." },
            { type: "heading", text: "Kontekst" },
            { type: "paragraph", text: "Obrnuto učenje može se primijeniti u različitim kontekstima obrazovanja odraslih, kao što su tečajevi strukovnog osposobljavanja, sveučilišta treće dobi i programi kontinuiranog obrazovanja." },
            { type: "heading", text: "Ključne točke" },
            {
              type: "bullets",
              items: [
                "Teorijski sadržaj uči se kod kuće, a vrijeme u učionici koristi se za praktične i interaktivne aktivnosti.",
                "Pristup je posebno prikladan za obrazovanje odraslih jer potiče autonomiju, personalizaciju i fleksibilnost.",
                "Oslanja se na platforme za e-učenje, video lekcije, podcastove i alate za online suradnju."
              ]
            },
            { type: "heading", text: "Rezultati" },
            { type: "paragraph", text: "Studije i istraživanja pokazala su da obrnuto učenje može dovesti do boljih ishoda učenja, povećanog angažmana učenika i većeg zadovoljstva obrazovnim iskustvom." }
          ]
        }
      }
    },
    {
      id: "matematica-live",
      country: "italy",
      category: "digital-learning",
      icon: "spark",
      readTime: 11,
      points: 30,
      gradient: ["#1172bd", "#173260"],
      translations: {
        en: {
          title: "Matematica Live: Interactive TEAL Platform",
          description:
            "A digital learning environment that combines technology-enabled active learning with collaboration, experimentation, and visual explanation.",
          sections: [
            { type: "heading", text: "Description" },
            { type: "paragraph", text: "Matematica Live is presented as an online platform with video lessons, interactive exercises, simulations, and games for mathematics learning." },
            { type: "paragraph", text: "Its TEAL orientation makes mathematics more interactive, accessible, and motivating across multiple levels of education." },
            { type: "heading", text: "Context" },
            { type: "paragraph", text: "The platform was created by Italian teachers and researchers to overcome traditional approaches and support students, teachers, and parents with flexible digital tools." },
            { type: "heading", text: "Key elements" },
            {
              type: "bullets",
              items: [
                "It offers multi-level content from primary school to university.",
                "It uses digital technologies such as videos, animations, simulations, and collaborative spaces.",
                "It supports personalized learning, immediate feedback, and stronger learner motivation."
              ]
            },
            { type: "heading", text: "Results" },
            { type: "paragraph", text: "The platform is reported to improve interest, motivation, and mathematics results while creating a more inclusive and stimulating learning environment." }
          ]
        },
        ro: {
          title: "Matematică Live",
          description:
            "MATEMATICA LIVE este o platformă online care oferă resurse și instrumente interactive pentru predarea și învățarea matematicii.",
          sections: [
            { type: "heading", text: "Descriere" },
            { type: "paragraph", text: "MATEMATICA LIVE este o platformă online care oferă resurse și instrumente interactive pentru predarea și învățarea matematicii. Site-ul web oferă o gamă largă de conținut, inclusiv lecții video, exerciții interactive, simulări și jocuri, acoperind diverse subiecte matematice, de la școala primară până la universitate." },
            { type: "paragraph", text: "Matematica Live se bazează pe metodologia TEAL, utilizând tehnologia pentru a face învățarea matematicii mai captivantă, stimulativă și accesibilă." },
            { type: "heading", text: "Context" },
            { type: "paragraph", text: "MATEMATICA LIVE a fost creată de un grup de profesori și cercetători italieni cu scopul de a oferi un sprijin inovator pentru educația matematică și de a depăși metodele tradiționale de predare, adesea percepute ca plictisitoare și distante de nevoile elevilor moderni." },
            { type: "heading", text: "Aspecte cheie" },
            {
              type: "bullets",
              items: [
                "Oferă o gamă largă de conținut: lecții video, exerciții interactive, simulări și jocuri.",
                "Propune un model educațional eficient de la școala primară până la universitate și susține învățarea pe mai multe niveluri.",
                "Folosește tehnologii digitale pentru implicare, feedback imediat, personalizare și colaborare între elevi și profesori."
              ]
            },
            { type: "heading", text: "Rezultate" },
            { type: "paragraph", text: "MATEMATICA LIVE a contribuit la îmbunătățirea învățării matematicii în diverse contexte educaționale și a dovedit că sporește interesul, motivația și rezultatele studenților într-un mediu de învățare stimulant și interactiv." }
          ]
        },
        it: {
          title: "Matematica Live",
          description:
            "MATEMATICA LIVE è una piattaforma online che offre risorse e strumenti interattivi per l'insegnamento e l'apprendimento della matematica.",
          sections: [
            { type: "heading", text: "Descrizione" },
            { type: "paragraph", text: "MATEMATICA LIVE è una piattaforma online che offre videolezioni, esercizi interattivi, simulazioni e giochi, coprendo vari argomenti matematici dalla scuola primaria all'università." },
            { type: "paragraph", text: "La piattaforma si basa sulla metodologia TEAL e utilizza la tecnologia per rendere l'apprendimento della matematica più coinvolgente, stimolante e accessibile." },
            { type: "heading", text: "Contesto" },
            { type: "paragraph", text: "MATEMATICA LIVE è stata creata da un gruppo di insegnanti e ricercatori italiani per offrire un supporto innovativo all'educazione matematica e superare metodi tradizionali spesso percepiti come noiosi e lontani dai bisogni degli studenti." },
            { type: "heading", text: "Aspetti chiave" },
            {
              type: "bullets",
              items: [
                "Offre un'ampia gamma di contenuti: lezioni video, esercizi interattivi, simulazioni e attività ludiche.",
                "Rappresenta un modello didattico multilivello, adatto a studenti di età e livelli diversi.",
                "Integra tecnologie digitali, feedback immediato, percorsi personalizzati e possibilità di collaborazione tra studenti e insegnanti."
              ]
            },
            { type: "heading", text: "Risultati" },
            { type: "paragraph", text: "MATEMATICA LIVE ha contribuito a migliorare l'apprendimento della matematica in diversi contesti educativi e ha dimostrato di aumentare interesse, motivazione e risultati degli studenti." }
          ]
        },
        es: {
          title: "Matemáticas en vivo",
          description:
            "MATEMATICA LIVE es una plataforma en línea que ofrece recursos y herramientas interactivas para la enseñanza y el aprendizaje de las matemáticas.",
          sections: [
            { type: "heading", text: "Descripción" },
            { type: "paragraph", text: "MATEMATICA LIVE es una plataforma en línea que ofrece lecciones en video, ejercicios interactivos, simulaciones y juegos, cubriendo diversos temas matemáticos desde la escuela primaria hasta la universidad." },
            { type: "paragraph", text: "Se basa en la metodología TEAL y utiliza la tecnología para hacer que el aprendizaje de las matemáticas sea más atractivo, estimulante y accesible." },
            { type: "heading", text: "Contexto" },
            { type: "paragraph", text: "MATEMATICA LIVE fue creada por un grupo de profesores e investigadores italianos con el objetivo de ofrecer un apoyo innovador para la educación matemática y superar métodos de enseñanza tradicionales percibidos como aburridos o distantes." },
            { type: "heading", text: "Aspectos clave" },
            {
              type: "bullets",
              items: [
                "Ofrece una amplia gama de contenidos: videolecciones, ejercicios interactivos, simulaciones y juegos.",
                "Funciona como un modelo educativo multinivel, válido desde primaria hasta la universidad.",
                "Integra tecnologías digitales, retroalimentación inmediata, itinerarios personalizados y espacios de colaboración entre estudiantes y profesorado."
              ]
            },
            { type: "heading", text: "Resultados" },
            { type: "paragraph", text: "MATEMATICA LIVE ha contribuido a mejorar el aprendizaje de las matemáticas en diversos contextos educativos y ha demostrado aumentar el interés, la motivación y los resultados del alumnado." }
          ]
        },
        el: {
          title: "Ζωντανά μαθηματικά",
          description:
            "Το MATEMATICA LIVE είναι μια διαδικτυακή πλατφόρμα που προσφέρει διαδραστικούς πόρους και εργαλεία για τη διδασκαλία και την εκμάθηση μαθηματικών.",
          sections: [
            { type: "heading", text: "Περιγραφή" },
            { type: "paragraph", text: "Το MATEMATICA LIVE προσφέρει μαθήματα βίντεο, διαδραστικές ασκήσεις, προσομοιώσεις και παιχνίδια που καλύπτουν διάφορα μαθηματικά θέματα από το δημοτικό σχολείο έως το πανεπιστήμιο." },
            { type: "paragraph", text: "Βασίζεται στη μεθοδολογία TEAL και χρησιμοποιεί την τεχνολογία για να κάνει τη μάθηση των μαθηματικών πιο ελκυστική, ενδιαφέρουσα και προσβάσιμη." },
            { type: "heading", text: "Συμφραζόμενα" },
            { type: "paragraph", text: "Το MATEMATICA LIVE δημιουργήθηκε από μια ομάδα Ιταλών καθηγητών και ερευνητών για να προσφέρει καινοτόμο υποστήριξη στην εκπαίδευση των μαθηματικών και να ξεπεράσει παραδοσιακές μεθόδους που θεωρούνται συχνά βαρετές ή απόμακρες." },
            { type: "heading", text: "Βασικά σημεία" },
            {
              type: "bullets",
              items: [
                "Προσφέρει ευρύ φάσμα περιεχομένου: μαθήματα βίντεο, διαδραστικές ασκήσεις, προσομοιώσεις και παιχνίδια.",
                "Λειτουργεί ως πολυεπίπεδο εκπαιδευτικό μοντέλο για μαθητές διαφορετικών ηλικιών και επιπέδων προετοιμασίας.",
                "Συνδυάζει ψηφιακές τεχνολογίες, άμεση ανατροφοδότηση, εξατομικευμένη μάθηση και συνεργασία μεταξύ μαθητών και εκπαιδευτικών."
              ]
            },
            { type: "heading", text: "Αποτελέσματα" },
            { type: "paragraph", text: "Το MATEMATICA LIVE έχει συμβάλει στη βελτίωση της μάθησης των μαθηματικών σε διάφορα εκπαιδευτικά πλαίσια και έχει αποδειχθεί ότι αυξάνει το ενδιαφέρον, το κίνητρο και τα αποτελέσματα των μαθητών." }
          ]
        },
        hr: {
          title: "Matematika Live",
          description:
            "MATEMATICA LIVE je online platforma koja nudi interaktivne resurse i alate za poučavanje i učenje matematike.",
          sections: [
            { type: "heading", text: "Opis" },
            { type: "paragraph", text: "MATEMATICA LIVE nudi video lekcije, interaktivne vježbe, simulacije i igre te pokriva različite matematičke teme od osnovne škole do sveučilišta." },
            { type: "paragraph", text: "Platforma se temelji na TEAL metodologiji i koristi tehnologiju kako bi učenje matematike učinila zanimljivijim, stimulativnijim i pristupačnijim." },
            { type: "heading", text: "Kontekst" },
            { type: "paragraph", text: "MATEMATICA LIVE stvorila je skupina talijanskih učitelja i istraživača kako bi ponudila inovativnu podršku matematičkom obrazovanju i nadvladala tradicionalne metode poučavanja koje se često doživljavaju kao dosadne i udaljene od potreba suvremenih učenika." },
            { type: "heading", text: "Ključne točke" },
            {
              type: "bullets",
              items: [
                "Nudi širok raspon sadržaja: video lekcije, interaktivne vježbe, simulacije i igre.",
                "Djeluje kao višerazinski obrazovni model prikladan od osnovne škole do sveučilišta.",
                "Povezuje digitalne tehnologije, trenutne povratne informacije, personalizirano učenje i suradnju između učenika i nastavnika."
              ]
            },
            { type: "heading", text: "Rezultati" },
            { type: "paragraph", text: "MATEMATICA LIVE pridonijela je poboljšanju učenja matematike u različitim obrazovnim kontekstima te je dokazano povećala interes, motivaciju i rezultate učenika." }
          ]
        }
      }
    }
  ];

  window.CASE_STUDIES_DATA = {
    defaultLocale: "en",
    locales,
    ui,
    studies,
  };
})();
