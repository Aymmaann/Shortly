document.addEventListener('DOMContentLoaded', () => {
    const shortenBtn = document.querySelector(".shorten-btn")
    const copyBtn = document.querySelector(".copy-btn")
    const hamburger = document.querySelector(".hamburger")
    const hamburgerIcon = document.querySelector(".hamburger-icon")
    const mobileNav = document.querySelector(".mobile-nav")
    let count = 0


    shortenBtn.addEventListener("click", async () => {
        const urlInput = document.querySelector(".url-input")
        checkEmpty(urlInput)
        const longURL = urlInput.value
        try {
            const shortURL = await shortenURL(longURL)
            if(shortURL) {
                createLinkBox(longURL, shortURL)
            }
        }
        catch {
            console.error("Error shortening URL:", error);
        }
    })


    async function shortenURL(longURL) {
        const apiURL = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longURL)}`
        try {
            const response = await fetch(apiURL)
            if(!response.ok) {
                throw new Error("Network response was not ok")
            }
            const shortURL = await response.text()
            return shortURL
        }
        catch {
            const urlInput = document.querySelector(".url-input")
            checkValid(urlInput)
            return null
        }
    }

    hamburger.addEventListener("click", () => {
        count++
        if(count % 2 === 0) {
            hamburger.innerHTML = '<i class="fa-solid fa-bars hamburger-icon"></i>'
            mobileNav.style.display = "none"
        }
        else {
            hamburger.innerHTML = '<i class="fa-solid fa-x hamburger-icon"></i>'
            mobileNav.style.display = "block"
        }
    })


    function checkEmpty(urlInput) {
        const errorMsg = document.querySelector(".error-msg")
        errorMsg.textContent = "Please add a link"
        if(!urlInput.value) {
            urlInput.classList.add("error-input")
            errorMsg.style.display = "block"
        }
        else {
            urlInput.classList.remove("error-input")
            errorMsg.style.display = "none"
        }
    }


    function checkValid(urlInput) {
        const errorMsg = document.querySelector(".error-msg")
        urlInput.classList.add("error-input")
        if(urlInput.value) {
            errorMsg.textContent = "Enter a valid URL"
        }
        errorMsg.style.display = "block"
    }


    function createLinkBox(urlInput, shortURL) {
        const linkSection = document.querySelector(".link-section")

        const link = document.createElement("div")
        link.classList.add("link")

        const enteredLink = document.createElement("p")
        enteredLink.classList.add("entered-link")
        enteredLink.textContent = urlInput
        link.appendChild(enteredLink)

        const newLinkSection = document.createElement("div")
        newLinkSection.classList.add("new-link-section")

        const newLink = document.createElement("p")
        newLink.classList.add("new-link")
        newLink.textContent = shortURL
        newLinkSection.appendChild(newLink)

        const copyBtn = document.createElement("button")
        copyBtn.classList.add("primary-btn", "copy-btn")
        copyBtn.textContent = "Copy"
        newLinkSection.appendChild(copyBtn)

        link.appendChild(newLinkSection)
        linkSection.appendChild(link)

        copyBtn.addEventListener("click", () => {
            console.log("clicked")
            copyBtn.textContent = "Copied"
            copyBtn.style.backgroundColor = "var(--dark-violet)"
            navigator.clipboard.writeText(shortURL)
        })
    }
})
