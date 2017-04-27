import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    hero: Hero;
    sub: any; // rxjs.Subscription

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
