import { Ch1Page } from './app.po';

describe('ch-1 App', function() {
  let page: Ch1Page;

  beforeEach(() => {
    page = new Ch1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
