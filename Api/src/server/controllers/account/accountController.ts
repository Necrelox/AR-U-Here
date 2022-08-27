import {Router, IRouter, Request, Response} from 'express';
import {AccountUtils} from './utils/accountUtils';
import {IToken, IUser} from '../../models';
import {AccountQueries, TokenModelQueries} from '../../database';

import {bearerToken, blackListedChecker} from '../../middleware';
import {Mailer, PasswordEncrypt} from '../../tools';

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
        this._router.use('/verify', bearerToken);
        this._router.post('/verify', async (req: Request, res: Response) => {
            await this.postMethodVerify(req, res);
        });
        this._router.post('/login', async (req: Request, res: Response) => {
            await this.postMethodLogin(req, res);
        });
        this._router.post('/login-cli', async (req: Request, res: Response) => {
            await this.postMethodLoginCli(req, res);
        });
        this._router.use('/logout', bearerToken, blackListedChecker);
        this._router.post('/logout', async (req: Request, res: Response) => {
            await this.postMethodLogout(req, res);
        });
        this._router.use('/check-token', bearerToken, blackListedChecker);
        this._router.get('/check-token', async (req: Request, res: Response) => {
            await this.getMethodCheckToken(req, res);
        });
    }

    private async postMethodSignup(req: Request, res: Response) {
        try {
            await super.checkPostContainMailANDUserANDPassword(req.body); // todo peut être remplacer
            await Promise.all([
                Mailer.checkEmailHasBadSyntax(req.body.email),
                Mailer.checkEmailIsTemporary(req.body.email),
                super.checkSyntaxUsername(req.body.username),
                super.checkLengthUsername(req.body.username),
                super.checkLengthPassword(req.body.password),
                super.checkSyntaxPassword(req.body.password)
            ]);

            const userUuid: Buffer = await AccountQueries.createAccountTransaction({
                email: req.body.email,
                username: req.body.username,
                password: PasswordEncrypt.encrypt(req.body.password)
            });

            const token: Partial<IToken>[] = await TokenModelQueries.get({
                userUuid
            }, {
                token: true,
            });

            res.status(200).send({
                code: 'OK',
                message: 'User and Token created successfully.',
                token: token[0]?.token as string
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
            await AccountQueries.setVerifiedUserTransaction(bearerToken);

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
            await super.checkPostContainMailORUsernameANDPassword(req.body); // todo peut être remplacer
            const userReflect: Partial<IUser> = req.body;
            const user: Partial<IUser> = await super.verifyUserPasswordAndVerifiedAndBlacklistedAndReturnUser(userReflect, req.body.password);
            const token: Partial<IToken> = await AccountQueries.loginAndGetTokenTransaction(user.uuid as Buffer);

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

            const userReflect: Partial<IUser> = req.body;
            const user: Partial<IUser> = await super.verifyUserPasswordAndVerifiedAndBlacklistedAndReturnUser(userReflect, req.body.password);
            const token: Partial<IToken> = await AccountQueries.loginAndGetTokenTransaction(user.uuid as Buffer, {
                device: req.body.deviceType,
                ip: req.body.ip,
                macAddress: req.body.macAddress
            });

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
            await AccountQueries.logoutUserTransaction(bearerToken);
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

