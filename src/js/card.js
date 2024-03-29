export default class ShowDetail {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    init() {
        this.renderCard(this.dataSource);
        }

    getItems(results) {
        if (!Array.isArray(results)) {
            return '';
        }
        return results.join(", ");
    }

    getValue(objects) {
        const values = objects.map((obj) => obj.name)
        return values.join(", ");
    }

    getStreamingData(result) {    
        //Check if result.streamingInfo.us is an array
        if (!Array.isArray(result.streamingInfo.us)) return [];
        return result.streamingInfo.us.map(obj => ({
            service: obj.service,
            streamingType: obj.streamingType,
            link: obj.link 
        }));
        }

    streamingTemplate(streamingData) {
        if (!streamingData || streamingData.length === 0) return "⚠️⚠️No streaming services provided!";
        return streamingData.map(data => 
            `
            <div class="streaming-card">
                <a href="${data.link}" target="_blank class="streaming-link">
                    <div class="streaming-img-container">
                        <img src="/images/streaming-logo/${data.service}.webp" class="streaming-serviceImg" alt="${data.service}"/>
                        <div>${data.streamingType}</div>
                    </div>
                </a>
            </div>
            `
            ).join("");
        }

    cardTemplate(title, imdbId, overview, cast, directors, genres, type, year, firstAirYr, lastAirYr) {
        let timeFrameContent = `<span class="card-year title-font">(N/A<)/span>`
        if (type === "movie") {
            timeFrameContent = `<span class="card-year title-font">(${year})</span>`;
        } else if (type === "series") {
            timeFrameContent = `<span class="card-year title-font">(${firstAirYr}-${lastAirYr})</span>`;
        } 
        return `
            <div class="card-box"><a href="https://www.imdb.com/title/${imdbId}" class="title-font" target="_blank">${title} &nbsp;</a>${timeFrameContent}</div>
            <div class="card-box">${overview}</div>
            <div class="card-box">
                <div class="card-box-left">Cast:</div>
                <div class="card-box-right">${cast}</div>
            </div>
            <div class="card-box">
                <div class="card-box-left">Director(s):</div>
                <div class="card-box-right">${directors}</div>
            </div>
            <div class="card-box">
                <div class="card-box-left">Genre(s):</div>
                <div class="card-box-right">${genres}</div>
            </div>
            <div class="card-box">
                <div class="card-box-left">Type:</div>
                <div class="card-box-right">${type}</div>  
            </div>
        `;
        } 

    renderCard(result) {
        const type = result.type;
        const title = result.title;
        const imdbId = result.imdbId;
        const overview = result.overview;
        const cast = this.getItems(result.cast);
        const year = result.year;
        const firstAirYr = result.firstAirYear;
        const lastAirYr = result.lastAirYear;
        const genres = this.getValue(result.genres);
        const directors = this.getItems(result.directors);
        const streamingData = this.getStreamingData(result);
        
        const cardHTML = this.cardTemplate(title, imdbId, overview, cast, directors, genres, type, year, firstAirYr, lastAirYr);
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("cardContainer");
        cardContainer.innerHTML = cardHTML;

        const streamingHTML = this.streamingTemplate(streamingData);
        const streamingContainer = document.createElement("div");
        streamingContainer.classList.add("streaming-container");
        streamingContainer.innerHTML += streamingHTML;

        const main = document.querySelector("main")
        const hr = document.createElement("hr");
        main.appendChild(cardContainer);
        main.appendChild(streamingContainer);
        main.appendChild(hr);
    }
}
