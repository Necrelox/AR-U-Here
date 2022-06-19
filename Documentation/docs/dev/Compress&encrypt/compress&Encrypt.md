# Compress & Encrypt

???+ note "Présentation de compress & encrypt"
    
    Compress et encrypt est une librairie dynamique, en language //TODO.
    Cette librairie permet de récupérer un fichier, d'effectuer une compression **sans perte** et ensuite de le découper en bloc et chiffrer chaque bloc.
    Le but est de gagner de l'espace de stockage ainsi que de sécuriser les fichiers.
   
    La librairie sera ensuite importée comme module NodeJs.

???+ info "Choix du langage"

    Le langage de cette librairies est le **C**.

???+ tip "Function de la librairie"
    
    La librairie compress & encrypt sera composée de deux fonctions principales :


    === "compressAndEncrypt"
        *Cette fonction permet de récuperer en paramètre un fichier et le compresser, découper en bloc et chiffrer chaque bloc.*


        [ ![](../../img/Compress&encrypt/compress&encrypt.png) ](../../img/Compress&encrypt/compress&encrypt.png/)
        { align=left}

        | Argument | Type | Description |
        | :---------: | :---------: | :----------------------------------: |
        | `filePath` | **`char *`** | correspond à un fichier entrant  |
        | `uuid` | **`char *`** | correspond à l'identifient du fichier qui sera ajouté en header des blocs  |

    
    === "decryptAndDecompress"
        *Cette fonction permet de reconstituer un fichier gâce à l'uuid et au seed.*


        [ ![](../../img/Compress&encrypt/decrypt&decompress.png) ](../../img/Compress&encrypt/decrypt&decompress.png/)
        { align=left}

        | Argument | Type | Description |
        | :---------: | :---------: | :----------------------------------: |
        | `dirPath` | **`char *`** | correspond au chemin du dossier des blocs  |
        | `seed` | **`char *`** | correspond à la graine de reconstitution de la séquence  |
        | `uuid` | **`char *`** | correspond à l'identifient du fichier  |
