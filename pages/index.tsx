import styles from '../styles/Home.module.css';
import { getDatabase } from "../src/database";
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ReactChild, ReactFragment, ReactPortal } from 'react';


export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();

  const games = await mongodb.db().collection("games").find().toArray();
  const gamesResult = JSON.parse(JSON.stringify(games));

  return { 
    props: { 
      games: gamesResult,
    }
  };
}

const home: React.FC<{ games: any }> = ({ games }) => {
  return (
    <>
      <div>
        {games.map((element: { slug: any; name: boolean | ReactChild | ReactFragment | ReactPortal; }, index: any) => {
          return (
            <Link href={`/games/${element.slug}`}>
              <p>{element.name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default home;