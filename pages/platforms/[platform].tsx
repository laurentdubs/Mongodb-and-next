import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/database";

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params.game);

  const mongodb = await getDatabase();
  const platforms = await mongodb
    .db()
    .collection("games")
    .find({ slug: context.params.platform })
    .toArray();
  const platformsResult = JSON.parse(JSON.stringify(platforms));

  return {
    props: {
      platforms: platformsResult,
    },
  };
};

const platform = ({ platforms }) => {
  return (
    <div>
      <h1>{platforms[0].name}</h1>
    </div>
  );
};

export default platform;