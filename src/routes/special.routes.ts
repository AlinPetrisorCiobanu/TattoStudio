import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/special', passport.authenticate('jwt'), (_req, _res) => {
    
});

export default router;