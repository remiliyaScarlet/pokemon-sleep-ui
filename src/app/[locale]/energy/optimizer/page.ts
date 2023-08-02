import {redirect} from 'next-intl/server';


const redirectToNewPath = () => {
  redirect('/team/optimizer');
};

export default redirectToNewPath;
