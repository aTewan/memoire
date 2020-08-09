import app from './src/app'

const PORT: string = process.env.PORT || "4000";

app.listen(PORT, () => {
  console.log((`MC-USERS LISTENING ON PORT : ${PORT}`));
});

