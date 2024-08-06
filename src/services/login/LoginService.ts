import { Request, Response, Router } from "express";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const router = Router();
const auth = getAuth();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    return res.status(200).json(newUser.user);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json(data.user);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/signout", async (req: Request, res: Response) => {
  try {
    await signOut(auth);
    return res.status(200).json({ message: "ok" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
