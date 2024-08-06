import { Request, Response, Router } from 'express';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../db/firebase-admin-service';

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', this.signUp);
    this.router.post('/login', this.login);
    this.router.post('/signout', this.signOut);
  }

  private async signUp(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      return res.status(200).json(newUser.user);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  private async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await signInWithEmailAndPassword(auth, email, password);
      return res.status(200).json(data.user);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  private async signOut(req: Request, res: Response) {
    try {
      await signOut(auth);
      return res.status(200).json({ message: 'ok' });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}

const authRoutesInstance = new AuthRoutes();
export default authRoutesInstance.router;
