export default abstract class RouteHandler {
    public static getURL(props: any) {
        let stops = props.stops;
        console.log(stops);

        var url = 'https://www.google.com/maps/dir/3305+Lilly+Rd+Brookfield+W+53005/';

        console.log(stops);
        //https://www.google.com/maps/dir/?api=1&origin=760+W+Genesee+St+Syracuse+NY+13204&waypoints=314+Avery+Ave+Syracuse+NY+13204|9090+Destiny+USA+Dr+Syracuse+NY+13204
        //Formatting
        //origin point is always going to be the highschool
        //use &waypoints= to start the list of stops
        //use | to separate each stop

        for (var i = 0; i < stops.length; i++) {
            var formattedAddressString = "";

            for (var j = 0; j < stops[i].name.length; j++) {
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

            formattedAddressString += '/';
            url+= formattedAddressString;
        }

        url += "3305+Lilly+Rd+Brookfield+W+53005";
        console.log(url);
        return url;
    }
}