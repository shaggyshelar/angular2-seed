export class Config {
    public static GetURL(apiURL: string): string {
        //  Production URL
        //  let baseURL= 'http://192.168.101.124:8010';

        //  Dev URL
        let baseURL = 'http://192.168.101.129:99'; //New_Dev
        //let baseURL = 'http://192.168.101.129:8001'; //New_Test
        //let baseURL = 'http://192.168.101.124:99';//Old_Test
        //let baseURL = 'http://192.168.101.124:8001';//Old_Dev
        return baseURL + apiURL;
    }
}
