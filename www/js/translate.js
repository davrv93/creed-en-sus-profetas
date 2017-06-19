app
    .config(["$translateProvider",function($translateProvider, $translate){     
        $translateProvider.translations("ES",{
			"app": "Creed en sus profetas",
            "reavivados":"Reavivados por su Palabra",
            "espiritu_profecia":"Espíritu de profecía",
            "configuracion":"Configuración",
            "calendario":"Calendario",
            "home":"Menú principal",
            "menu": "Menú",
            "cerrar":"Cerrar",
            "hashtag": "#rpsp",
            "home_msg": "Clic en el botón de la esquina superior izquierda para ver las opciones.",
            "reader_msg": "Seleccione por lo menos un versículo para poder compartirlo.",
            "errors":{
                "404":"Hubo un problema al obtener la lectura de hoy, verifique su conexión a internet. Si usted tiene conexión a internet activada entonces la lectura para hoy no ha sido actualizada por el programador, sirvase notificar en Google Play del caso. Gracias"
            },
            "libro":{
                "profetas_reyes": {
                    "titulo": "Profetas y Reyes",
                    "capitulo1":{
                        "titulo": "Destruido por falta de conocimiento",
                        "abreviatura": ""
                    },
                    "capitulo2":{
                        "titulo": "He ahí a vuestro Dios",
                        "abreviatura": ""
                    }
                }

            },
            "config":{
                "idioma": "Idioma de aplicación",
                "tema": "Color de tema",
                "version": "Versión de Biblia"

            },
            "translate":
            {
                "español": "Español",
                "ingles": "Inglés",  
                "elegido":"Usted ha seleccionado ",
                "confirmar":", haga click en la flecha para continuar",
                "elegir": "Seleccione un idioma para continuar (click en bandera)"
            },
            "book":{
                "genesis":"Génesis",
                "exodo":"Éxodo",
                "levitico":"Levítico",
                "numeros":"Números",
                "deuteronomio":"Deuteronomio",
                "josue":"Josué",
                "jueces":"Jueces",
                "rut":"Rut",
                "1samuel":"1ra Samuel",
                "2samuel":"2da Samuel",
                "1reyes":"1ra Reyes",
                "2reyes":"2da Reyes",
                "1cronicas":"1ra Crónicas",
                "2cronicas":"2da Crónicas",
                "esdras":"Esdras",
                "nehemias":"Nehemías",
                "ester":"Ester",
                "job":"Job",
                "salmos":"Salmos",
                "proverbios":"Proverbios",
                "eclesiastes":"Eclesiastés",
                "cantares":"Cantares",
                "isaias":"Isaías",
                "jeremias":"Jeremías",
                "lamentaciones":"Lamentaciones",
                "ezequiel":"Ezequiel",
                "daniel":"Daniel",
                "oseas":"Oseas",
                "joel":"Joel",
                "amos":"Amos",
                "abdias":"Abdías",
                "jonas":"Jonás",
                "miqueas":"Miqueas",
                "nahum":"Nahúm",
                "habacuc":"Habacuc",
                "sofonias":"Sofonías",
                "hageo":"Hageo",
                "zacarias":"Zacarías",
                "malaquias":"Malaquías",
                "mateo":"Mateo",
                "marcos":"Marcos",
                "lucas":"Lucas",
                "juan":"Juan",
                "hechos": "Hechos de los Apóstoles",
                "romanos":"Romanos",
                "1corintios":"I Corintios",
                "2corintios":"II Corintios",
                "galatas":"Gálatas",
                "efesios":"Efesios",
                "filipenses":"Filipenses",
                "colosenses":"Colosenses",
                "1tesalonicenses":"I Tesalonicenses",
                "2tesalonicenses":"II Tesalonicenses",
                "1timoteo":"I Timoteo",
                "2timoteo":"II Timoteo",
                "tito":"Tito",
                "filemon":"Filemón",
                "hebreos":"Hebreos",
                "santiago":"Santiago",
                "1pedro":"I Pedro",
                "2pedro":"II Pedro",
                "1juan":"I Juan",
                "2juan":"II Juan",
                "3juan":"III Juan",
                "judas":"Judas",
                "apocalipsis":"Apocalipsis"
            }
            
        });
        $translateProvider.translations("EN",{
            "app": "Believe his prophets",
            "menu": "Menu",
            "home":"Home",
            "cerrar":"Close",
            "home_msg": "Click the button in the upper left corner to see the options.",
            "reader_msg": "Select at least one verse to share it.",
            "reavivados":"Revived by his Word",
            "espiritu_profecia":"Spirit of prophecy",
            "configuracion":"Settings",
            "calendario":"Calendar",
            "hashtag": "#bhp",
            "config":{
                "idioma": "App language",
                "tema": "Theme of app (Color)",
                "version": "Bible's version"

            },
            "translate":
            {
                "español": "Spanish",
                "ingles": "English",
                "elegido":"You've chosen ",
                "confirmar":", click on the next button (arrow) to continue",
                "elegir": "Touch on a flag for choose your app display language"
            },
            "errors":{
                "404":"There was a trouble trying to get the daily reading, please verify your internet connection is enabled. If you have internet connection activated then reading for today has not been updated by the programmer, please notify on Google play the case. Thanks."
            },
            "libro":{
                "profetas_reyes": {
                    "titulo": "Prophets and Kings",
                    "capitulo1":{
                        "titulo": "The call of Isaiah",
                        "abreviatura": ""
                    },
                    "capitulo2":{
                        "titulo": "Behold Your God!",
                        "abreviatura": ""
                    }
                }

            },            
            "book":{
                "genesis":"Genesis",
                "exodo":"Exodus",
                "levitico":"Leviticus",
                "numeros":"Numbers",
                "deuteronomio":"Deuteronomy",
                "josue":"Joshua",
                "jueces":"Judges",
                "rut":"Ruth",
                "1samuel":"1 Samuel",
                "2samuel":"2 Samuel",
                "1reyes":"1 Kings",
                "2reyes":"2 Kings",
                "1cronicas":"1 Chronicles",
                "2cronicas":"2 Chronicles",
                "esdras":"Ezra",
                "nehemias":"Nehemiah",
                "ester":"Esther",
                "job":"Job",
                "salmos":"Psalm",
                "proverbios":"Proverbs",
                "eclesiastes":"Ecclesiastes",
                "cantares":"Song of Solomon",
                "isaias":"Isaiah",
                "jeremias":"Jeremiah",
                "lamentaciones":"Lamentations",
                "ezequiel":"Ezekiel",
                "daniel":"Daniel",
                "oseas":"Hosea",
                "joel":"Joel",
                "amos":"Amos",
                "abdias":"Obadiah",
                "jonas":"Jonah",
                "miqueas":"Micah",
                "nahum":"Nahum",
                "habacuc":"Habakkuk",
                "sofonias":"Zephaniah",
                "hageo":"Haggai",
                "zacarias":"Zechariah",
                "malaquias":"Malachi",
                "mateo":"Matthew",
                "marcos":"Mark",
                "lucas":"Luke",
                "juan":"John",
                "hechos": "Acts",
                "romanos":"Romans",
                "1corintios":"1 Corinthians",
                "2corintios":"2 Corinthians",
                "galatas":"Galatians",
                "efesios":"Ephesians",
                "filipenses":"Philippians",
                "colosenses":"Colossians",
                "1tesalonicenses":"1 Thessalonians",
                "2tesalonicenses":"2 Thessalonians",
                "1timoteo":"1 Timothy",
                "2timoteo":"2 Timothy",
                "tito":"Titus",
                "filemon":"Philemon",
                "hebreos":"Hebrews",
                "santiago":"James",
                "1pedro":"1 Peter",
                "2pedro":"2 Peter",
                "1juan":"1 John",
                "2juan":"2 John",
                "3juan":"3 John",
                "judas":"Jude",
                "apocalipsis":"Revelation"
            }
            
        });       
        if (localStorage.language != undefined) {
            $translateProvider.preferredLanguage(localStorage.language);
        } else{
            $translateProvider.preferredLanguage('ES');
        }
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useSanitizeValueStrategy('escape');
        
    }]);