import {redirect} from 'next-intl/server';


const redirectToNewPath = () => {
  redirect('/team');
};

export default redirectToNewPath;
