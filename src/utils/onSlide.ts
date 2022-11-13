import React from 'react'

export type slideDirectionType<T = Element> = {
  x: 'left' | 'right' | 'none',
  y: 'up' | 'down' | 'none',
  lastTouchEvent: React.TouchEvent<T>
}
export type SlideEventHandler<T = Element> = (direction: slideDirectionType<T>) => void;

export const onSlide = <T extends Element = HTMLDivElement>(runner: SlideEventHandler<T>): Pick<
  React.DOMAttributes<T>,
  'onTouchStart' | 'onTouchMove' | 'onTouchCancel' | 'onTouchEnd'
> => {
  let originX: number;
  let originY: number;

  const calSliding = (lastX: number, lastY: number, lastEvent: React.TouchEvent<T>) => {
    const slideDirX: slideDirectionType<T>['x'] = originX > lastX ? 'right' : originX < lastX ? 'left' : 'none';
    const slideDirY: slideDirectionType<T>['y'] = originY > lastY ? 'down' : originY < lastY ? 'up' : 'none';

    runner({ x: slideDirX, y: slideDirY, lastTouchEvent: lastEvent });
  }

  return {
    onTouchStart: ev => {
      ({ pageX: originX, pageY: originY } = ev.changedTouches[0]);
    },
    onTouchMove: ev => { },
    onTouchCancel: ev => {
      const { pageX: lastX, pageY: lastY } = ev.changedTouches[0];
      calSliding(lastX, lastY, ev);
    },
    onTouchEnd: ev => {
      const { pageX: lastX, pageY: lastY } = ev.changedTouches[0];
      calSliding(lastX, lastY, ev);
    },
  }
}