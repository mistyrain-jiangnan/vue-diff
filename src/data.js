// 测试数据
export const A = `package psafe

import (
   "sync"
)

type Group struct {
   wg        sync.WaitGroup
   c     chan error
}

func NewGroup() *Group {
   return &Group{
      c: make(chan er, 100),
   }
}

// Go calls the given  in a new goroutine
func (g *Group) Go(f () error) {
   g.wg.Add(1)
   go func() {
      defer g.wg.Done()
      if err := f(); err != nil {
         g.c <- err
      }
   }()
}

func (g *) Done() chan  {
   return g.c
}

func (g *Group) ()  {
   defer g.()
   g.wg.Wait()
   var err 
   if len(g.c) > 0 {
      err, _ = <- g.c
   }
   return 
}

func (g *Group) Close() {
   close(g.c)
}`;
export const B = `ackage psafe

import (
   "sync"
)

type Group struct {
   wg        sync.WaitGroup
   c     chan error
}

func NewGroup() *Group {
   return &Group{
      c: make(chan error, 100),
   }
}

// Go calls the given function in a new goroutine
func (g *Group) Go(f func() error) {
   g.wg.Add(1)
   go func() {
      defer g.wg.Done()
      if err := f(); err != nil {
         g.c <- err
      }
   }()
}

func (g *Group) Done() chan error {
   return g.c
}

func (g *Group) Wait() error {
   defer g.Close()
   g.wg.Wait()
   var err error
   if len(g.c) > 0 {
      err, _ = <- g.c
   }
   return err
}

func (g *Group) Close() {
   close(g.c)
}`;
