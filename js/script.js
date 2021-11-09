const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search tech_company.json
const searchCompanies = async searchText => {
    const res = await fetch('../data/tech_company.json');      // res for response
    const companies = await res.json();

    // Get matches to current text input
    let matches = companies.filter(company => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return company.headquarter.match(regex) || company.coName.match(regex);
    });

    if(searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outPutHtml(matches);
}

// Show results in html
const outPutHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
        <div class="card card-body mb-1">
            <h4>${match.coName} (${match.headquarter}) <span class="text-primary">${match.ceo}</span></h4>
            <small>Revenue in 2020: ${match.revenue}</small>
            <div>
            <img src="${match.images}" width="500" height="500">
            </div>
        </div>
        `
        )
        .join('');

        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchCompanies(search.value));


