{
  description = "A Nix-flake-based Node.js development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:

    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [
          (self: super: {
            nodejs = super.nodejs-18_x;
            pnpm = super.nodePackages.pnpm;
          })
        ];
        pkgs = import nixpkgs { inherit overlays system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [ 
            deno
            just
            nodejs
            pnpm
            (vscode-with-extensions.override {
                    vscode = pkgs.vscodium;
                    vscodeExtensions = with pkgs.vscode-extensions; [
                      asvetliakov.vscode-neovim
                      dracula-theme.theme-dracula
                      jnoortheen.nix-ide
                      mkhl.direnv
                    ] ++ pkgs.vscode-utils.extensionsFromVscodeMarketplace [
                      {
                        name = "aiken";
                        publisher = "TxPipe";
                        version = "1.0.8";
                        sha256 = "99b000d27a710d7313dd2639a4ff56ec9d38dcbbbf126c36f259683217a3a6f9";
                      }
                    ];
                  })
          ];
          shellHook = ''
            echo "node `${pkgs.nodejs}/bin/node --version`"
          '';
        };
      }
    );
}
