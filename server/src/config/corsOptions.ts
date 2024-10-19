const allowedOrigins: string[] = [
    "https://algotrades.io",
    "http://127.0.0.1:5174",
    "http://localhost:5174",
    "https://www.algotrades.io",
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
