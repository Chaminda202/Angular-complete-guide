import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post} from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('postForm') postForm: NgForm;
  loadedPost: Post[] = [];
  isFetching = false;
  error = null;
  constructor(private http: HttpClient,
              private postService: PostService) {}
  ngOnInit() {
    this.fetchPosts();
  }

  /*
  onCreatePost(postData: {title: string, content: string}) {
    console.log(postData);
    this.http
      .post<{name: string}>(
        'https://http-request-e99d9.firebaseio.com/posts.json',
        postData
      ).subscribe(
        responseData => {
          console.log(responseData);
        }
      );
    this.postForm.reset();
  }
  */

  onCreatePost(postData: {title: string, content: string}) {
    const post: Post = {title: postData.title, content: postData.content};
    this.postService
      .createAndStorePost(post)
      .subscribe(
        responseData => {
          console.log(responseData);
        }
      );
    this.postForm.reset();
  }

  onFetchPosts() {
    console.log('Fetching data....');
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPost()
        .subscribe(
          posts => {
            this.isFetching = false;
            this.loadedPost = posts;
          }, error => {
            this.error = error.message;
            console.log(error);
          }
        );
  }

  /*
  private fetchPosts() {
    this.http.get(
      'https://http-request-e99d9.firebaseio.com/posts.json'
    ).pipe(map((responseData: { [key: string]: Post}) => {
      const postArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({ ...responseData[key], id: key });
        }
      }
      return postArray;
    })
    ).subscribe(
      posts => {
        console.log(posts);
      }
    );
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http.get<{ [key: string]: Post}>(
      'https://http-request-e99d9.firebaseio.com/posts.json'
    ).pipe(map(responseData => {
      const postArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({ ...responseData[key], id: key });
        }
      }
      return postArray;
    })
    ).subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPost = posts;
      }
    );
  }
  */

  onDeletePosts() {
    this.postService.deletePost()
        .subscribe(() => {
          this.loadedPost = [];
        });
  }
}
