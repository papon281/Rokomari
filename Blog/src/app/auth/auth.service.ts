import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginPayload} from "./login-payload";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {LocalStorageService } from "ngx-webstorage";
import { JwtAutResponse } from "./jwt.aurh.response";
import { RegisterPayload } from "./register-paylod";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private url = 'http://localhost:8080/api/auth/';

    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService){
    }

    register(registerPayload: RegisterPayload): Observable<any>{
        return this.httpClient.post(this.url + 'signup', registerPayload);
    }

    login(loginPayload: LoginPayload): Observable<boolean>{
        return this.httpClient.post<JwtAutResponse>(this.url + 'login', loginPayload).pipe(map(data => {
            this.localStorageService.store('authenticationToken', data.authenticationToken);
            this.localStorageService.store('username',data.username);
            return true;
        }));
    }

    isAuthenticated(): boolean{
        return this.localStorageService.retrieve('username') != null;
    } 
    
    logout(){
        this.localStorageService.clear('authenticatonToken');
        this.localStorageService.clear('username');
    }
}