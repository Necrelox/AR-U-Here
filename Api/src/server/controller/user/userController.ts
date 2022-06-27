import {Router, IRouter, Request, Response, NextFunction} from "express";
import {UserUtils} from "./utils/userUtils";
import {BearerToken} from "../../middleware/bearerToken/bearerToken";
import * as Models from "../../model";

export class UserController extends UserUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAccountController();
    }

    private initializeAccountController() {
        this._router.use("/me", async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get('/me', async (req: Request, res: Response) => {
            await this.getMethodMe(req, res);
        });
        this._router.put('/me', async (req: Request, res: Response) => {
            await this.putMethodMe(req, res);
        });

        this._router.use("/me/logo", async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get("/me/logo", async (req: Request, res: Response) => {
            await this.getMethodMeLogo(req, res);
        });
        this._router.post("/me/logo", async (req: Request, res: Response) => {
            await this.postMethodMeLogo(req, res);
        });
        this._router.delete("/me/logo", async (req: Request, res: Response) => {
            await this.deleteMethodMeLogo(req, res);
        });
    }

    /** ME */
    private async getMethodMe(req: Request, res: Response) {
        try {
            const tokenFKUser: Models.User.ITokenFKUser = await super.getUserByFKTokenByBearerToken((req.headers.authorization)?.split(" ")[1]!);
            res.status(200).send({
                code: 'OK',
                user: {
                    username: tokenFKUser.username,
                    email: tokenFKUser.email,
                    activityMessage: tokenFKUser.activityMessage,
                    isConnected: tokenFKUser.isConnected,
                    createdAt: tokenFKUser.createdAt,
                }
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async putMethodMe(req: Request, res: Response) {
        try {
            const reflectUser: Models.User.IUser = req.body;
            if (Object.keys(reflectUser).length > 0) {
                await super.checkUserReflectForModify(reflectUser);
                const tokenFKUser: Models.User.ITokenFKUser = await super.getUserByFKTokenByBearerToken((req.headers.authorization)?.split(" ")[1]!);
                await super.updateUserByReflect({uuid: tokenFKUser.uuid!}, reflectUser);
            } else {
                res.status(200).send({
                    code: "OK",
                    message: "No data to update."
                });
            }
            res.status(200).send({
                code: "OK",
                message: "User updated."
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    /** LOGO */
    private async getMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo revoir le systeme de logo
            res.status(200).send({
                code: "OK",
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async postMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo revoir le systeme de logo
            res.status(200).send({
                code: "OK",
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async deleteMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo revoir le systeme de logo
            res.status(200).send({
                code: "OK",

            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    public getRouter(): IRouter {
        return this._router;
    }
}
