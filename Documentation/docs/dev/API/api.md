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
    
        - /SkillZBox/verify (Vérification d'un compte et connection)
            - POST
                - Paramètres:
                    - code: string
                - Retour:
                    - code: string
                    - message: string
                    - token: string
    
        - /SkillZBox/login-cli (Connection)
            - POST
                - Paramètres:
                    - username: string
                    - email: string
                    - password: string
                    - ip: string
                    - macAddress: string
                    - deviceType: string
    
                - Retour:
                    - code: string
                    - message: string
                    - token: string

    
        - /SkillZBox/login (Connection)
            - POST
                - Paramètres:
                    - username: string
                    - email: string
                    - password: string
                    - 
                - Retour:
                    - code: string
                    - message: string
                    - token: string
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
            
    
        - /SkillZBox/user/me/logo (Logo de l'utilisateur)
            - GET
                - Paramètres Header:
                    - token: string
                - Retour:
                    - code: string
                    - message: string
                    - userLogo: array[object]
            - POST
                - Paramètres Header:
                    - token: string
                - Paramètres:
                    - logo: string
                - Retour:
                    - code: string
                    - message: string
            - Delete
                - Paramètres Header:
                    - token: string
                - Paramètres:
                    - userLogoUuid: boolean
                - Retour:
                    - code: string
                    - message: string
    
        - /SkillZBox/user/user-friends (Liste des amis)
            - GET (récupère les amis)
                - Paramètres Header:
                    - token: string
                - Retour:
                    - code: string
                    - message: string
                    - friends: array[object]
            - POST (accepte un ami)
                - Paramètres Header:
                    - token: string
                - Paramètres:
                    - friendUuid: string
                - Retour:
                    - code: string
                    - message: string
            - DELETE (delete un amis)
                - Paramètres Header:
                    - token: string
                - Paramètre:
                    - friendUuid: Buffer
                - Retour:
                    - code: string
                    - message: string

        -  /SkillZBox/user/user-friends-requests (Liste des demandes amis)
            - GET (récupère les demandes amis)
                - Paramètres Header:
                    - token: string
                - Retour:
                    - code: string
                    - message: string
                    - friendsRequests: array[object]
            - POST (ajoute une demande amis)
                - Paramètres Header:
                    - token: string
                - Paramètres:
                    - friendRequestUuid: Buffer
                - Retour:
                    - code: string
                    - message: string
            - DELETE (refuse une demande amis)
                - Paramètres Header:
                    - token: string
                - Paramètre:
                    - uuidFriendRequest: Buffer
                - Retour:
                    - code: string
                    - message: string

        ```
    ??? info "Categories and Tag"
        
           ```
           - /SkillZBox/categorie (Categories)
              - GET
                   - Paramètre Header:
                       - token: string
                   - Retour:
                       - code: string
                       - message: string
                       - categories: array[object]
        
           - /SkillZBox/tag (Tags)
               - GET
                   - Paramètre Header:
                       - token: string
                   - Retour:
                       - code: string
                       - message: string
                       - tags: array[object]
           ```

    ??? info "Room"
           ```
           - /SkillZBox/room (Room)
               - POST (Création)
                   - Paramètre Header :
                      - token: string
                   - Paramètre :
                       - uuid_user: string
                       - categorie_uuid: string
                       - tag_uuid: string
                   - Retour :
                       - code: string
                       - message: string
              - GET
                  - Paramètre Header :
                       - token: string
                  - Paramètre : 
                       - ?uuid_user: string
                       - ?categorie_uuid: string
                       - ?tag_uuid: string
                  - Retour :
                       - code: string
                       - message: string
                       - room: object
              - PUT
                  - Paramètre Header :
                       - token: string
                  - Paramètre :
                       - room_uuid: string
                  - Retour :
                       - code: string
                       - message: string
            
           - /SkillZBox/room/users (Room User)
               - GET
                   - Paramètre Header :
                       - token: string
                   - Paramètre :
                       - room_uuid: string
                       - ?uuid_user: string
                   - Retour :
                       - code: string
                       - message: string
                       - users: array[object]
              - POST
                   - Paramètre Header :
                       - token: string
                   - Paramètre :
                       - room_uuid: string
                       - uuid_user: string
                       - is_room_master: boolean
                   - Retour :
                       - code: string
                       - message: string
        
           - /SkillZBox/room/message (Tchat de la room)
               - POST
                   - Paramètre Header :
                       - token : string
                   - Paramètre :
                       - room_uuid : string 
                       - user_uuid : string
                       - has_files : string
                       - file: string
                       - message : string
                   - Retour :
                       - code : string
                       - message : string
               - GET 
                   - Paramètre Header :
                       - token : string
                   - Paramètre :
                       - room_uuid
                   - Retour:
                       - code : string
                       - message : string
                       - tchat : array[object]
               - POST
                   - Paramètre Header :
                       - token : string
                   - Paramètre :
                       - room_uuid : string
                       - user_uuid : string
                       - message_uuid : string
        
           - /SkillZBox/room/files (Liste des fichiers d'une room)
               - GET
                   - Paramètre Header :
                       - token: string
                   - Paramètre :
                       - room_uuid: string
                       - ?room_message_uuid: string
                   - Retour :
                       - code: string
                       - message: string
                       - files: array[object]
        
           - /SkillZBox/room/categories (Liste des categories d'une room)
               - GET
                   - Paramètre Header :
                       - token : string
                   - Paramètre :
                       - room_uuid : string
                   - Retour :
                       - code : string
                       - message : string
                       - categories : array[object]
        
           - /SkillZBox/room/tags (Liste des tags d'une room)
               - GET
                   - Paramètre Header :
                       - token : string
                   - Paramètre :
                       - room_uuid : string
                  - Retour :
                       - code : string
                       - message : string
                       - tags : array[object]
        
           - /SkillZBox/room/report (Signaler un utilisateur)
               - POST
                   - Paramètre Header :
                       - token : string
                   - Paramètre :
                       - user_send_report_uuid : string
                       - user_reported_uuid : string
                       - reason : string
                   - Retour :
                       - code : string
                       - message : string
           ```
    ??? info "Admin"
    
           ```
           - /SkillZBox/admin/user (User)
               - GET
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - ?uuid_user: string
                   - Retour:
                       - code: string
                       - message: string
                       - users: array[object]
               - PUT
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - uuid_user: string
                       - ?username: string
                       - ?email: string
                       - ?password: string
                       - ?role: boolean
                       - ?is_verified: boolean
                   - Retour:
                       - code: string
                       - message: string
               - DELETE
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - uuid_user: string
                   - Retour:
                       - code: string
                       - message: string
        
           - /SkillZBox/admin/report (Report)
               - GET
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - ?uuid_user: string
                   - Retour:
                       - code: string
                       - message: string
                       - reports: array[object]
               - DELETE
                   - Paramètre Header:
                       - token: string
                   - Paramètre:
                       - uuid_user: string
                       - reason: string
                   - Retour:
                       - code: string
                       - message: string
                       - reports: array[object]
        
           - /SkillZBox/admin/user/logo (Logo user)
               - GET
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - uuid_user: string
                   - Retour:
                       - code: string
                       - message: string
                       - logo: array[object]
               - PUT
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - uuid_user: string
                       - user_log_uuid: string
                       - ?seed: string
                       - ?path: string
                       - ?active: boolean
                   - Retour:
                       - code: string
                       - message: string
        
           - /SkillZBox/admin/user-ip (User ip)
               - GET
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - ?uuid_user: string
                   - Retour:
                       - code: string
                       - message: string
                       - user_ip: array[object]
        
           - /SkillZBox/admin/user-macadress (User macadress)
               - GET
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - ?uuid_user: string
                   - Retour:
                       - code: string
                       - message: string
                       - user_macadress: array[object]
        
           - /SkillZBox/admin/user-friend (User friend)
               - GET
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - ?uuid_user: string
                   - Retour:
                       - code: string
                       - message: string
                       - user_friend: array[object]
        
           - /SkillZBox/admin/user-device (User device)
               - GET
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - ?uuid_user: string
                   - Retour:
                       - code: string
                       - message: string
                       - user_device: array[object]
            
           - /SkillZBox/admin/user-history (User history)
               - GET
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - ?uuid_user: string
                   - Retour:
                       - code: string
                       - message: string
                       - user_history: array[object]
            
           - /SkillZBox/admin/user-history-message (User history message)
               - GET
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - user_history_uuid: string
                   - Retour:
                       - code: string
                       - message: string
                       - user_history_message: array[object]
        
           - /SkillZBox/admin/user-history-action (User history action)
               - GET
                   - Paramètre Header:
                       - token: string
                       - mac_address: string
                   - Paramètre:
                       - user_history_uuid: string
                   - Retour:
                       - code: string
                       - message: string
                       - user_history_action: array[object]
           ```
