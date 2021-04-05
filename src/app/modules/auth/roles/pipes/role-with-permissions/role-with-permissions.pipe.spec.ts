import { RoleWithPermissionsPipe } from './role-with-permissions.pipe';

describe('RoleWithPermissionsPipe', () => {
  it('create an instance', () => {
    const pipe = new RoleWithPermissionsPipe();
    expect(pipe).toBeTruthy();
  });
});
