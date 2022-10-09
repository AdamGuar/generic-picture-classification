export class AppExceptionHandler {
    static hadnleAppException(err) {
        console.log(`Unable to complete app exectution..
                     REASON: 
                     ${JSON.stringify(err)}`);
    }
}