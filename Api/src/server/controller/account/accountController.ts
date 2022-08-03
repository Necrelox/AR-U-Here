import {AccountUtils} from './utils/accountUtils';
import {Router, IRouter, Request, Response, NextFunction} from 'express';
import * as Tools from '../../tools';
import * as Models from '../../model';
import * as DBQueries from '../../database';
import {MiddlewareManager} from "../../middleware";

export class AccountController extends AccountUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAccountController();
    }

    private initializeAccountController() {
        this._router.post('/signup', async (req: Request, res: Response) => {
            await this.postMethodSignup(req, res);
        });
        this._router.post('/verify', async (req: Request, res: Response) => {
            await this.postMethodVerify(req, res);
        });
        this._router.post('/login', async (req: Request, res: Response) => {
            await this.postMethodLogin(req, res);
        });
        this._router.post('/login-cli', async (req: Request, res: Response) => {
            await this.postMethodLoginCli(req, res);
        });
        this._router.use('/logout', async (req: Request, res: Response, next: NextFunction) => {
            await MiddlewareManager.middlewares(req, res, next);
        });
        this._router.post('/logout', async (req: Request, res: Response) => {
            await this.postMethodLogout(req, res);
        });
        this._router.use('/check-token', async (req: Request, res: Response, next: NextFunction) => {
            await MiddlewareManager.middlewares(req, res, next);
        });
        this._router.get('/check-token', async (req: Request, res: Response) => {
            await this.getMethodCheckToken(req, res);
        });
    }

    private async postMethodSignup(req: Request, res: Response) {
        try {
            await super.checkPostContainMailANDUserANDPassword(req.body);

            await Promise.all([
                Tools.Mailer.checkEmailHasBadSyntax(req.body.email),
                Tools.Mailer.checkEmailIsTemporary(req.body.email),
                super.checkSyntaxUsername(req.body.username),
                super.checkLengthUsername(req.body.username),
                super.checkLengthPassword(req.body.password),
                super.checkSyntaxPassword(req.body.password)]);

            await DBQueries.AccountQueries.createAccountTransaction({
                email: req.body.email,
                username: req.body.username,
                password: Tools.PasswordEncrypt.encrypt(req.body.password)
            });

            // const token: SzBxModel.User.IToken = await super.getTokenByReflect({userUuid: user[0].uuid});
            // await super.sendEmailVerification(user, token);

            res.status(200).send({
                code: 'OK',
                message: 'User and Token created successfully.'
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async postMethodVerify(req: Request, res: Response) {
        try {
            const bearerToken : string = req.headers.authorization?.split(' ')[1] as string;
            await super.verifyTokenSignature(bearerToken);
            const token: Models.User.IToken = await super.getTokenByReflect({token: bearerToken});
            await super.verifyTokenExpirationAndSendMail(token);

            await DBQueries.AccountQueries.setVerifiedUserTransaction(token.userUuid);

            res.status(200).send({
                code: 'OK',
                message: 'User verified successfully.'
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async postMethodLogin(req: Request, res: Response) {
        try {
            await super.checkPostContainMailORUsernameANDPassword(req.body);
            const userReflect: Partial<Models.User.IUser> = await super.transformPostBodyToUserReflect(req.body);
            const user: Models.User.IUser = await super.verifyUserPasswordAndVerifiedAndBlacklistedAndReturnUser(userReflect, req.body.password);
            const token = await DBQueries.AccountQueries.loginUserAndGetTokenTransaction(user.uuid);

            res.status(200).send({
                code: 'OK',
                message: 'User logged successfully.',
                token: token.token
            });

        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async postMethodLoginCli(req: Request, res: Response) {
        try {
            await super.checkPostContainMailORUsernameANDPassword(req.body);
            await super.checkPostContainIpANDMacAddressANDDeviceType(req.body);
            const userReflect: Partial<Models.User.IUser> = await super.transformPostBodyToUserReflect(req.body);
            const user: Models.User.IUser = await super.verifyUserPasswordAndVerifiedAndBlacklistedAndReturnUser(userReflect, req.body.password);
            const token = await DBQueries.AccountQueries.loginCLIUserAndGetTokenTransaction(user.uuid, req.body.ip, req.body.macAddress, req.body.deviceType);

            res.status(200).send({
                code: 'OK',
                message: 'User logged successfully.',
                token: token.token
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async postMethodLogout(req: Request, res: Response) {
        try {
            const bearerToken : string = req.headers.authorization?.split(' ')[1] as string;
            await DBQueries.AccountQueries.logoutUserTransaction(bearerToken);
            res.status(200).send({
                code: 'OK',
                message: 'User logout successfully.',
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async getMethodCheckToken(_req: Request, res: Response) {
        try {
            res.status(200).send({
                code: 'OK',
                message: 'Token is valid.',
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    public getRouter() {
        return this._router;
    }
}

