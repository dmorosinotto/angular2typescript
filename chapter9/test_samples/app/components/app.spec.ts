import {provide} from 'angular2/core';
import {Location, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {SpyLocation} from 'angular2/router/testing';
import {beforeEach, beforeEachProviders, inject, it} from 'angular2/testing';

import {AppComponent} from './app';

describe('Router', () => {
  let location: Location;
  let router: Router;

  beforeEachProviders(() => [
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(Router, {useClass: RootRouter}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent})
  ]);

  beforeEach(inject([Router, Location], (_router, _location) => {
    location = _location;
    router = _router;
  }));

  it('should be able to navigate to Home', done => {
    router.navigate(['/Home']).then(() => {
      expect(location.path()).toBe('');
      done();
    }).catch(e => done.fail(e));
  });

  it('should be able to navigate to Weather by route name', done => {
    router.navigate(['/Weather']).then(() => {
      expect(location.path()).toBe('/weather');
      done();
    }).catch(e => done.fail(e));
  });

  it('should be able to navigate to Weather by URL', done => {
    router.navigateByUrl('/weather').then(() => {
      expect(location.path()).toBe('/weather');
      done();
    }).catch(e => done.fail(e));
  });
});
