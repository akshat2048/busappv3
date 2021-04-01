export default abstract class RouteHandler {
    public static getURL(props: any) {
        let stops = props;
        console.log(stops);

        var url = "http://www.mapquestapi.com/directions/v2/optimizedroute?key=ia7mvG9M8imVlf9Czviz12ADllK8AniE&json={\'locations\':[\'3305+Lilly+Rd+Brookfield+W+53005\',\'";

        console.log(stops);
        //https://www.google.com/maps/dir/?api=1&origin=760+W+Genesee+St+Syracuse+NY+13204&waypoints=314+Avery+Ave+Syracuse+NY+13204|9090+Destiny+USA+Dr+Syracuse+NY+13204
        //Formatting
        //origin point is always going to be the highschool
        //use &waypoints= to start the list of stops
        //use | to separate each stop

        for (var i = 0; i < stops.length; i++) {
            var formattedAddressString = "";

            for (var j = 0; j < stops[i].name.length-7; j++) {
                var replacementChar = '';
                if ((stops[i].name.charAt(j) == ' ') || (stops[i].name.charAt(j) == ',') || (stops[i].name.charAt(j) == '&')) {
                    replacementChar = '+'
                    for (var k = j; k < stops[i].name.length; k++) {
                        if ((stops[i].name.charAt(k) == ' ') || (stops[i].name.charAt(k) == ',') || (stops[i].name.charAt(k) == '&')) {
                            j++;
                        } else {
                            j--;
                            break;
                        }

                    }
                } else {
                    replacementChar = stops[i].name.charAt(j);
                }

                formattedAddressString += replacementChar;
            }
            if(i != stops.length - 1){
            formattedAddressString += "\',\'";
            }
            url+= formattedAddressString;
        }
        url += "\']}";
        console.log(url);
        return url;
    }

    /**
     * getHEREMapsURL
     */
    public static getHEREMapsURL(waypoints: any) {
        //https://wego.here.com/directions/drive/50-Boulevard-Saint-Germain,-75005-Paris,-France:48.85000,2.35000/Cologne,-Germany:loc-dmVyc2lvbj0xO3RpdGxlPUNvbG9nbmU7bGFuZz1lbjtsYXQ9NTAuOTQxNjg7bG9uPTYuOTU1MTc7Y2l0eT1Db2xvZ25lO2NvdW50cnk9REVVO3N0YXRlPU5vcnRoLVJoaW5lLVdlc3RwaGFsaWE7Y291bnR5PUNvbG9nbmU7Y2F0ZWdvcnlJZD1jaXR5LXRvd24tdmlsbGFnZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTEwMC0wMDAw/Leipziger-Straße-133,-10117-Berlin,-Germany:52.51000,13.38000?avoid=carHOV&map=50.70758,7.87316,7,normal
    //https://wego.here.com/directions/drive/1500GreenwayTerraceElmGroveWI/BrookfieldWI/NewBerlinWI/MilwaukeeWI?mode=truck
    //https://wego.here.com/directions/drive/Brookfield-WI/New-Berlin-WI/Milwaukee-WI?mode=truck&matchSideOfStreet=always
    //https://wego.here.com/directions/drive/Brookfield:loc-dmVyc2lvbj0xO3RpdGxlPUJyb29rZmllbGQ7bGFuZz1lbjtsYXQ9NDMuMDU3MzE7bG9uPS04OC4xMjYzMjtjaXR5PUJyb29rZmllbGQ7Y291bnRyeT1VU0E7c3RhdGU9V2lzY29uc2luO3N0YXRlQ29kZT1XSTtjb3VudHk9V2F1a2VzaGE7Y2F0ZWdvcnlJZD1jaXR5LXRvd24tdmlsbGFnZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTEwMC0wMDAw/New-Berlin:loc-dmVyc2lvbj0xO3RpdGxlPU5ldytCZXJsaW47bGFuZz1lbjtsYXQ9NDIuOTc1Mzk7bG9uPS04OC4xMTg1NjtjaXR5PU5ldytCZXJsaW47Y291bnRyeT1VU0E7c3RhdGU9V2lzY29uc2luO3N0YXRlQ29kZT1XSTtjb3VudHk9V2F1a2VzaGE7Y2F0ZWdvcnlJZD1jaXR5LXRvd24tdmlsbGFnZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTEwMC0wMDAw/Milwaukee:loc-dmVyc2lvbj0xO3RpdGxlPU1pbHdhdWtlZTtsYW5nPWVuO2xhdD00My4wNDI7bG9uPS04Ny45MDY4NztjaXR5PU1pbHdhdWtlZTtjb3VudHJ5PVVTQTtzdGF0ZT1XaXNjb25zaW47c3RhdGVDb2RlPVdJO2NvdW50eT1NaWx3YXVrZWU7Y2F0ZWdvcnlJZD1jaXR5LXRvd24tdmlsbGFnZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTEwMC0wMDAw?mode=truck&matchSideOfStreet=always&avoid=carHOV&map=43.01413,-88.01596,13,normal
    //https://wego.here.com/directions/drive/Brookfield:loc-dmVyc2lvbj0xO3RpdGxlPUJyb29rZmllbGQ7bGFuZz1lbjtsYXQ9NDMuMDU3MzE7bG9uPS04OC4xMjYzMjtjaXR5PUJyb29rZmllbGQ7Y291bnRyeT1VU0E7c3RhdGU9V2lzY29uc2luO3N0YXRlQ29kZT1XSTtjb3VudHk9V2F1a2VzaGE7Y2F0ZWdvcnlJZD1jaXR5LXRvd24tdmlsbGFnZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTEwMC0wMDAw/New-Berlin:loc-dmVyc2lvbj0xO3RpdGxlPU5ldytCZXJsaW47bGFuZz1lbjtsYXQ9NDIuOTc1Mzk7bG9uPS04OC4xMTg1NjtjaXR5PU5ldytCZXJsaW47Y291bnRyeT1VU0E7c3RhdGU9V2lzY29uc2luO3N0YXRlQ29kZT1XSTtjb3VudHk9V2F1a2VzaGE7Y2F0ZWdvcnlJZD1jaXR5LXRvd24tdmlsbGFnZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTEwMC0wMDAw/Milwaukee:loc-dmVyc2lvbj0xO3RpdGxlPU1pbHdhdWtlZTtsYW5nPWVuO2xhdD00My4wNDI7bG9uPS04Ny45MDY4NztjaXR5PU1pbHdhdWtlZTtjb3VudHJ5PVVTQTtzdGF0ZT1XaXNjb25zaW47c3RhdGVDb2RlPVdJO2NvdW50eT1NaWx3YXVrZWU7Y2F0ZWdvcnlJZD1jaXR5LXRvd24tdmlsbGFnZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTEwMC0wMDAw?mode=truck&avoid=carHOV&map=43.01413,-88.01596,13,normal
    //https://wego.here.com/directions/drive/Hollyhock-Ln-Underwood-River-Pkwy,-Elm-Grove,-Village-of,-WI-53122,-USA:loc-dmVyc2lvbj0xO3RpdGxlPUhvbGx5aG9jaytMbislMkYrVW5kZXJ3b29kK1JpdmVyK1Brd3k7bGF0PTQzLjA1NDYyO2xvbj0tODguMDgwODc7c3RyZWV0PUhvbGx5aG9jaytMbislMkYrVW5kZXJ3b29kK1JpdmVyK1Brd3k7c3RyZWV0cz1Ib2xseWhvY2srTG4lMkNVbmRlcndvb2QrUml2ZXIrUGt3eTtjaXR5PUVsbStHcm92ZSUyQytWaWxsYWdlK29mO3Bvc3RhbENvZGU9NTMxMjI7Y291bnRyeT1VU0E7c3RhdGU9V2lzY29uc2luO3N0YXRlQ29kZT1XSTtjb3VudHk9V2F1a2VzaGE7Y2F0ZWdvcnlJZD1pbnRlcnNlY3Rpb247c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTk0MDAtMDQwMg//////2400-Pilgrim-Square-Dr,-Brookfield,-WI-53005,-USA:loc-dmVyc2lvbj0xO3RpdGxlPTI0MDArUGlsZ3JpbStTcXVhcmUrRHI7bGFuZz1lbjtsYXQ9NDMuMDYxMzA5ODE0NDUzMTI1O2xvbj0tODguMTA1OTg3NTQ4ODI4MTI7c3RyZWV0PVBpbGdyaW0rU3F1YXJlK0RyO2hvdXNlPTI0MDA7Y2l0eT1Ccm9va2ZpZWxkO3Bvc3RhbENvZGU9NTMwMDU7Y291bnRyeT1VU0E7c3RhdGU9V2lzY29uc2luO3N0YXRlQ29kZT1XSTtjb3VudHk9V2F1a2VzaGE7Y2F0ZWdvcnlJZD1idWlsZGluZztzb3VyY2VTeXN0ZW09aW50ZXJuYWw7bmxhdD00My4wNjEzMDk4MTQ0NTMxMjU7bmxvbj0tODguMTA2MjE2NDMwNjY0MDY7cGRzQ2F0ZWdvcnlJZD05MDAtOTMwMC0wMDAw?mode=truck&matchSideOfStreet=always&avoid=carHOV&map=43.05306,-88.0831,14,normal

    var url = "https://wego.here.com/directions/drive/Brookfield-East-High-School/"

    var stops = []
    for (var i = 0; i < waypoints.length; i++) {
        let obj = {
            name: ""
        }
        obj.name = waypoints[i].name
        stops.push(obj)
    }


    console.log("RouteHandler stops is " + stops);

    stops.sort(function(a, b){return a.stopNum - b.stopNum});

    for (var i = 0; i < stops.length; i++) {
        var formattedAddressString = "";

        for (var j = 0; j < stops[i].name.length; j++) {
            // var replacementChar = stops[i].name.charAt(j);
            // if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(replacementChar)) {
            //     replacementChar = "-" + replacementChar;
            //     //j++;
            // }
            var replacementChar = "";
            if ((stops[i].name.charAt(j) == ' ') || (stops[i].name.charAt(j) == '&')) {
                replacementChar = '-'
                for (var k = j; k < stops[i].name.length; k++) {
                    if ((stops[i].name.charAt(k) == ' ') || (stops[i].name.charAt(k) == '&')) {
                        j++;
                    } else {
                        j--;
                        break;
                    }

                }
            } else {
                replacementChar = stops[i].name.charAt(j);
            }
            //https://wego.here.com/directions/drive/Brookfield-East-High-School/-ookfield-st-g/-n-rnando--derwood-ver-wy-m-ove/-neau-vd-chard--m-ove/1400-eenway-rrace-m-ove/1500-eenway-rrace-m-ove/-odlawn-r-llside--m-ove/-neau-vd-m-ove--m-ove/-llside--nset--m-ove/-neau-vd-m-ove--m-ove/-neau-vd-urch--m-ove/-ndhurst--mhurst-wy-m-ove/-ndhurst--gion--m-ove/-derwood-ver-wy-llyhock-ne-m-ove/-bby--sca--m-ove/-nwoody--bby--m-ove/-e--rowhead--m-ove/-e--llyhock--m-ove/13500-orth-e-ookfield/2400-lgrim-uare--ookfield?mode=truck&matchSideOfStreet=always&mode=shortest

            formattedAddressString += replacementChar;
        }

        formattedAddressString += ':'
        formattedAddressString += waypoints[i].location[1]
        formattedAddressString += ','
        formattedAddressString += waypoints[i].location[0]
        formattedAddressString += '/';
        url+= formattedAddressString;
    }

    url = url.substring(0, url.length-1);
    url += "?mode=truck&matchSideOfStreet=always&mode=shortest";
    console.log(url);
    return url;
    }
}