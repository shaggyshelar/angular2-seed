export class Config {
    public static GetURL(apiURL: string): string {
        // Production URL
    //let baseURL= 'http://192.168.101.20:99';

        // Dev URL 123
        // UAT API URL
        // let baseURL = 'http://192.168.101.21:99';
        // New_Test http://espld200:99/
       let baseURL = 'http://192.168.101.129:99';
        //  New_Dev
        // let baseURL = 'http://192.168.101.129:8001';
        //let baseURL = 'http://192.168.101.124:99';//Old_Test
        //let baseURL = 'http://192.168.101.124:8001';//Old_Dev
        return baseURL + apiURL;
    }
}
