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

//https://www.google.com/maps/dir/?api=1&origin=3305+Lilly+Rd+Brookfield+W+53005&waypoints=13500+W+North+Ave+Brookfield+WI+53005|San+Fernando+Dr+Underwood+River+Pkwy+Elm+Grove+WI+53122|Bobby+Ln+Tosca+Ct+Elm+Grove+WI+53122|Lee+Ct+Hollyhock+Ln+Elm+Grove+WI+53122|Lindhurst+Dr+Legion+Dr+Elm+Grove+WI+53122|Juneau+Blvd+Church+St+Elm+Grove+WI+53122|Juneau+Blvd+Elm+Grove+Rd+Elm+Grove+WI+53122|Juneau+Blvd+Orchard+Ln+Elm+Grove+WI+53122|1500+Greenway+Terrace+Elm+Grove+WI+53122|2400+Pilgrim+Square+Dr+Brookfield+WI+53005|&destination=3305+Lilly+Rd+Brookfield+W+53005

//https://www.google.com/maps/dir/?api=1&origin=3305+Lilly+Rd+Brookfield+W+53005&waypoints=13500+W+North+Ave+Brookfield+WI+53005|San+Fernando+Dr+Underwood+River+Pkwy+Elm+Grove+WI+53122|Underwood+River+Pkwy+Hollyhock+Lane+Elm+Grove+WI+53122|Bobby+Ln+Tosca+Ct+Elm+Grove+WI+53122|Dunwoody+Dr+Bobby+Ln+Elm+Grove+WI+53122|Lee+Ct+Hollyhock+Ln+Elm+Grove+WI+53122|Lee+Ct+Arrowhead+Ct+Elm+Grove+WI+53122|Lindhurst+Dr+Legion+Dr+Elm+Grove+WI+53122|Lindhurst+Dr+Elmhurst+Pkwy+Elm+Grove+WI+53122|Juneau+Blvd+Church+St+Elm+Grove+WI+53122|Juneau+Blvd+Elm+Grove+St+Elm+Grove+WI+53122|Juneau+Blvd+Elm+Grove+Rd+Elm+Grove+WI+53122|&destination=3305+Lilly+Rd+Brookfield+W+53005