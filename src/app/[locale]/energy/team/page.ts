import {redirect} from 'next-intl/server';


const redirectToNewPath = () => {
  redirect('/team/analysis');
};

export default redirectToNewPath;
