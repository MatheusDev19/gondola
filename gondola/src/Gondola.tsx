// --- Componentes (Mapeamento de Cores e Layout) ---

import { Box, ButtonBase, Typography } from "@mui/material";
import type { ButtonBaseProps, BoxProps } from "@mui/material";
import { useGondola } from "./context";
import type { ShelfColumn } from "./interface";

// Observação: cada componente aceita `sx` e props do componente MUI correspondente.
// Os `sx` padrão são mesclados com o `sx` recebido via props (o recebido tem prioridade).

// 1. GONDOLA (Azul)
const GondolaContainer = ({ children, sx, ...rest }: BoxProps) => {
  return (
    <Box
      sx={{
        border: "4px solid #2196f3",
        borderRadius: "16px",
        p: 2,
        display: "flex",
        gap: 2,
        overflowX: "auto",
        backgroundColor: "#f5f5f5",
        minHeight: "80vh",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

// 2. MÓDULO (Verde)
const ModuleContainer = ({ children, ...rest }: BoxProps) => {
  return (
    <Box
      sx={{
        border: "3px solid #4caf50",
        borderRadius: "12px",
        p: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 300,
        flex: 1,
        backgroundColor: "#ffffff",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

// 3. PRATELEIRA (Laranja)
const ShelfContainer = ({ children, ...rest }: BoxProps) => {
  return (
    <Box
      sx={{
        border: "3px solid #ff9800",
        borderRadius: "8px",
        p: 1,
        display: "flex",
        flexDirection: "column",
        height: 400,
        gap: 1,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

// 4. STACKS (Roxo e Vermelho)
// BaseStack foi removido (estilos aplicados diretamente nos containers superiores/inferiores)

const UpperStackContainer = (props: BoxProps) => {
  const { children, ...rest } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        p: 1,
        overflowX: "auto",
        alignItems: "stretch",
        border: "2px solid #9c27b0",
        borderRadius: "6px",
        height: "40%",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

const LowerStackContainer = (props: BoxProps) => {
  const { children, ...rest } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        p: 1,
        overflowX: "auto",
        alignItems: "stretch",
        border: "2px solid #f44336",
        borderRadius: "6px",
        height: "60%",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

// 5. COLUNA (Marrom) - aceita isReversed e forwards events como onClick
type ProductColumnProps = ButtonBaseProps & { isReversed?: boolean };
const ProductColumnContainer = ({
  isReversed = false,
  children,
  ...rest
}: ProductColumnProps) => {
  return (
    <ButtonBase
      sx={{
        border: "2px solid #795548",
        borderRadius: "4px",
        minWidth: 40,
        flex: 1,
        display: "flex",
        flexDirection: isReversed ? "column-reverse" : "column",
        justifyContent: "flex-start",
        alignItems: "center",
        p: 0.5,
        gap: 1,
        backgroundColor: "#fffefe",
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "#efebe9",
        },
      }}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

// ITEM DO PRODUTO
const ProductItem = ({ ...rest }: BoxProps) => {
  return (
    <Box
      sx={{
        width: "90%",
        height: 20,
        backgroundColor: "#333",
        borderRadius: 2,
        flexShrink: 0,
      }}
      {...rest}
    />
  );
};

// --- Componentes Funcionais ---

const ProductColumnView = ({
  column,
  isReversed,
  onAdd,
}: {
  column: ShelfColumn;
  isReversed: boolean;
  onAdd: () => void;
}) => {
  return (
    <ProductColumnContainer isReversed={isReversed} onClick={onAdd}>
      {column.products.map((prod) => (
        <ProductItem key={prod.id} sx={{ bgcolor: prod.color }} />
      ))}
    </ProductColumnContainer>
  );
};

export const Gondola = () => {
  const { gondola, addProductToColumn } = useGondola();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Sistema de Gôndolas
      </Typography>
      <Typography variant="caption" display="block" mb={2}>
        Legenda: Azul (Gôndola) {">"} Verde (Módulo) {">"} Laranja (Prateleira){" "}
        {">"}
        Roxo (Sup 40%) / Vermelho (Inf 60%) {">"} Marrom (Colunas)
      </Typography>

      <GondolaContainer>
        {gondola.modules.map((module) => (
          <ModuleContainer key={module.id}>
            {/* Cabeçalho do módulo opcional */}
            {module.shelves.map((shelf) => (
              <ShelfContainer key={shelf.id}>
                {/* STACK SUPERIOR (ROXO) - 40% */}
                <UpperStackContainer>
                  {shelf.upperStack.columns.map((col) => (
                    <ProductColumnView
                      key={col.id}
                      column={col}
                      isReversed={false} // Normal: Cima para baixo
                      onAdd={() =>
                        addProductToColumn(shelf.id, "upper", col.id)
                      }
                    />
                  ))}
                </UpperStackContainer>

                {/* STACK INFERIOR (VERMELHO) - 60% */}
                <LowerStackContainer>
                  {shelf.lowerStack.columns.map((col) => (
                    <ProductColumnView
                      key={col.id}
                      column={col}
                      isReversed={true} // Reverso: Baixo para cima
                      onAdd={() =>
                        addProductToColumn(shelf.id, "lower", col.id)
                      }
                    />
                  ))}
                </LowerStackContainer>
              </ShelfContainer>
            ))}
          </ModuleContainer>
        ))}
      </GondolaContainer>
    </Box>
  );
};
