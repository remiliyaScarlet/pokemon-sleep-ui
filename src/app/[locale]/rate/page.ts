import {redirect} from 'next-intl/server';


const redirectToNewPath = () => {
  redirect('/rating');
};

export default redirectToNewPath;
