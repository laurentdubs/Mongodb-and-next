import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/database";

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params.game);

  const mongodb = await getDatabase();
  const games = await mongodb
    .db()
    .collection("games")
    .find({ slug: context.params.game })
    .toArray();
  const data = JSON.parse(JSON.stringify(games));

  return {
    props: {
      games: data,
    },
  };
};

const game = ({ games }) => {
  return (
    <div>
      <h1>{games[0].name}</h1>
    </div>
  );
};

export default game;