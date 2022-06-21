???+ note "Definition de l'API"

    L'**api** est une interface de communication entre le serveur et le client.
    
    Elle permet de faire le lien entre la base de données et le client.

    Selon la route, l'api va effectuer un traitement sur les données récupéré.


???+ question "Pourquoi l'api ?"
    
    Le choix d'une api est très simple, elle permet de pouvoir faire plusieurs type de client qui communiquent avec le serveur.
    
    On peut aisément, grâce  à des requêtes sur l'api, récupérer des données, et les réutiliser.

???+ info "Routes"

    ??? info "Account"
    
        ```
        - /SkillZBox/signup (Création d'un compte)
            - POST
                - Paramètres:
                    - username: string
                    - password: string
                    - email: string
    
                - Retour:
                    - code: string
                    - message: string
        ```
    
    ??? info "User"

        ```
        - /SkillZBox/user/me (Informations de l'utilisateur)
            - GET
                - Paramètres Header:
                    - token: string
                - Retour:
                    - code: string
                    - message: string
                    - user: object
            - PUT
                - Paramètres Header:
                    - token: string
                - Paramètres:
                    - username: string
                    - password: string
                    - email: string
                - Retour:
                    - code: string
                    - message: string

        ```
