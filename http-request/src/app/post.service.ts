import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  createAndStorePost(post: Post): Observable<{name: string}> {
    let multiParams = new HttpParams();
    multiParams = multiParams.append('user_id', '12');
    multiParams = multiParams.append('type', 'deafult');
    return this.http.post<{name: string}>(
            'https://http-request-e99d9.firebaseio.com/posts.json',
            post,
            {
              headers: new HttpHeaders({'Content-Type': 'application/json'}),
              // params: new HttpParams().set('user_id', '2')
              params: multiParams
            }
          );
  }

  fetchPost(): Observable<Post[]> {
   return this.http.get<{[key: string]: Post}>(
      'https://http-request-e99d9.firebaseio.com/posts.json'
    ).pipe(map(responseData => {
      const postArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({...responseData[key], id: key});
        }
      }
      return postArray;
    }));
  }

  deletePost() {
    return this.http.delete('https://http-request-e99d9.firebaseio.com/posts.json');
  }
}
