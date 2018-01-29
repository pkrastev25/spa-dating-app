import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../_models/UserModel';
import {ActivatedRoute} from '@angular/router';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';

/**
 * Component responsible for rendering the detailed information
 * of an user.
 */
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: UserModel;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  /**
   * Constructor.
   *
   * @param {ActivatedRoute} routeService Reference to the activated route service
   */
  constructor(private routeService: ActivatedRoute) {
  }

  // region LIFECYCLE

  ngOnInit() {
    // Retrieve the data from the resolver
    this.routeService.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  // endregion LIFECYCLE

  /**
   * Prepares the images in the desired format requested by
   * {@link NgxGalleryImage}.
   *
   * @returns {Array} The images of the user
   */
  getImages() {
    const imageUrls = [];

    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }

    return imageUrls;
  }

}
