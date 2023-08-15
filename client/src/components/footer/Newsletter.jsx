import React from "react";
import NewsletterForm from "./NewsletterForm";
import MailchimpSubscribe from "react-mailchimp-subscribe";
const url = process.env.REACT_APP_MAILCHIMP_URL

function Newsletter() {
  return (
    <div>
    <MailchimpSubscribe
      url={ url }
      render={ ( props ) => {
        const { subscribe, status, message } = props || {};
        return (
          <NewsletterForm
            status={ status }
            message={ message }
            onValidated={ formData => subscribe( formData ) }
          />
        );
      } }
    />
    </div>
  );
}

export default Newsletter;
