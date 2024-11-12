declare namespace Express {
    interface Request {
        session: any; // Specify the type for your session, typically 'any' for dynamic data
    }
}