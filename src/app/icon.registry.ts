import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class IconRegistry {

  registerIcons(icons: any[]) {
  }
}

export const MOCKICON_FOO = 'mockicon-foo';
export const MOCKICON_BAR = 'mockicon-bar';
export const DO_NOT_CLEANUP = 'do-not-cleanup';
