import {redirect} from 'next-intl/server';


const redirectToNewPath = () => {
  redirect('/energy/analysis');
};

export default redirectToNewPath;
