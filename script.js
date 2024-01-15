function handleResponse(response) {
    let priceFlag = false;

    const bookDetailsElement = document.getElementById('bookDetails');
    bookDetailsElement.innerHTML = "";

    if (response.items && response.items.length > 0) {

        console.log("Title: " + response.items[0].volumeInfo.title);
        bookDetailsElement.innerHTML += "<p>Title: " + response.items[0].volumeInfo.title + "</p>";
        if (response.items[0].volumeInfo.subtitle != undefined) {
            console.log("Sub Title: " + response.items[0].volumeInfo.subtitle);
            bookDetailsElement.innerHTML += "<p>Sub Title: " + response.items[0].volumeInfo.subtitle + "</p>";
        }
        /*if(response.items[0].volumeInfo.description !== undefined){
        console.log(response.items[0].volumeInfo.description);
        bookDetailsElement.innerHTML += "<p>" + response.items[0].volumeInfo.description + "</p>";
        }*/
        console.log("Author: " + response.items[0].volumeInfo.authors[0]);
        bookDetailsElement.innerHTML += "<p>Author: " + response.items[0].volumeInfo.authors[0] + "</p>";

        for (let i = 0; i < response.items.length; i++) {
            if (response.items[i].saleInfo && response.items[i].saleInfo.retailPrice !== undefined) {
                console.log("Price: " + response.items[i].saleInfo.retailPrice.amount + " " + response.items[i].saleInfo.retailPrice.currencyCode);
                bookDetailsElement.innerHTML += "<p>Price: " + response.items[i].saleInfo.retailPrice.amount + " " + response.items[i].saleInfo.retailPrice.currencyCode + "</p>";
                console.log(i);
                priceFlag = true;
                break;
            }
        }
        if (priceFlag === false) {
            console.log("Price not Available");
            bookDetailsElement.innerHTML += "<p>Price not Available</p>";
        }
        //console.log(response.items[0].volumeInfo.title); 
        console.log(response);
        if(response.items[0].volumeInfo.imageLinks !== undefined){
            const imgElement = document.getElementById('bookImage');
            imgElement.src = response.items[0].volumeInfo.imageLinks.thumbnail;
            //imgElement.style.width = '40%';   
            //imgElement.style.height = '80%';
        }
    } else {
        console.log("No books found");
    }
}
// "https://www.googleapis.com/books/v1/volumes?q=wings+of+fire&callback=handleResponse&key={{API_KEY}}"       
function makeApiCall() {
    const bookTitleInput = document.getElementById('bookTitle');
    const bookAuthorInput = document.getElementById('bookAuthor');
    const bookTitle = bookTitleInput.value.replace(/\s+/g, '-');   // Replace spaces with hyphens
    const bookAuthor = bookAuthorInput.value.replace(/\s+/g, '-'); // Replace spaces with hyphens
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle + bookAuthor)}&callback=handleResponse`;
    const script = document.createElement('script');
    script.src = apiUrl;
    document.head.appendChild(script);
} 