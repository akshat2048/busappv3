export default abstract class APICommunicator {
    /**
     * checkInformation(String, String)
     */
    public static checkInformation(username: String, password: String) {
        switch (username) {
            case "":
                //do nothing
                break;
            case "00000":
                //check password and do something
                break;
            default:
                break;
        }
    }
}