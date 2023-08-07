import {redirect} from 'next-intl/server';


const redirectToNewPath = () => {
  redirect('/pokedex');
};

export default redirectToNewPath;
