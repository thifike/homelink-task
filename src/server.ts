import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`HomeLink app listening at http://localhost:${port}`));
