<<<<<<< HEAD
import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({title = "ChatBlink", description = "This is the chat application ChatBlink", }) => {
  return ( 
  // <Helmet>
  <>
    <title>{title}</title>
    <meta name = "description" content={description}/>
    </>
  // </Helmet> 
  );
};

export default Title;
=======
import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({title = "ChatBlink", description = "This is the chat application ChatBlink", }) => {
  return ( 
  // <Helmet>
  <>
    <title>{title}</title>
    <meta name = "description" content={description}/>
    </>
  // </Helmet> 
  );
};

export default Title;
>>>>>>> b8a3feb (first commit)
