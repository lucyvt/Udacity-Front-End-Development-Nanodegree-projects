function handleSubmit(event) {
    event.preventDefault()

    let urlInput = document.querySelectorAll('#url')

    let json_url = JSON.parse(JSON.stringify(urlInput[0].value))

    if(Client.isValidURL(json_url)) {
        
        console.log('::: Sentiment Analysis is in progress :::');
        
        const analyzeData = async (url, data={})=> { 
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials:'same-origin',
                body: JSON.stringify(data)
            });
            
            if(response) {
                try {
                    a = JSON.parse(response);
                } catch(e) {
                    alert(e); // error in the above string (in this case, yes)!
                }
            }
            /*try {

                const newData = await response.json();

                return newData;
                
            } catch(error) {
                console.log('error in sending data');
            };
            */
        };

        
        analyzeData('http://localhost:3000/article', {url: json_url})


        .then( (response) => {

            document.querySelector('section.url-results #polarity').innerHTML = res.polarity || ""
            document.querySelector('section.url-results #subjectivity').innerHTML = res.subjectivity || ""
            document.querySelector('section.url-results #polarity_confidence').innerHTML = res.polarity_confidence || ""
            document.querySelector('section.url-results #subjectivity_confidence').innerHTML = res.subjectivity_confidence  || ""
            document.querySelector('section.url-results #excerpt').innerHTML = res.text || ""
        })
        

    } else {
        console.log('Not a Valid URL');
    }
     
}
    
/*
        fetch('http://localhost:3000/article', {

            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: urlInput[0].value})
        }) 
            .then(res => res.json())
            .then( (res) => {
                document.querySelector('section.url-results #polarity').innerHTML = res.polarity
                document.querySelector('section.url-results #subjectivity').innerHTML = res.subjectivity
                document.querySelector('section.url-results #polarity_confidence').innerHTML = res.polarity_confidence
                document.querySelector('section.url-results #subjectivity_confidence').innerHTML = res.subjectivity_confidence
                document.querySelector('section.url-results #excerpt').innerHTML = res.text
            })
*/

export { handleSubmit }
