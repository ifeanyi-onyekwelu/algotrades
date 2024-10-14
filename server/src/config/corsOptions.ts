const allowedOrigins: string[] = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://invest.vercel.app",
];

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by cors"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOptions;
